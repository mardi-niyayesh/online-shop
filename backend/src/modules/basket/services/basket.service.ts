import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterOperator, paginate, PaginateQuery } from 'nestjs-paginate';
import { Repository } from 'typeorm';
import { AddManyItemsDto } from '../dto/add-many-items.dto';
import { BasketItem } from '../entities/basket-item.entity';
import { Basket } from '../entities/basket.entity';

@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(Basket)
    private readonly basketRepository: Repository<Basket>,
    @InjectRepository(BasketItem)
    private readonly itemRepository: Repository<BasketItem>,
  ) {}

  async create(dto: AddManyItemsDto, userId: number) {
    const { items } = dto;
    const basketItems: BasketItem[] = [];

    let basket = await this.basketRepository.findOneBy({ userId });

    if (!basket || (basket && basket.isCheckedOut)) {
      const newBasket = this.basketRepository.create({ userId });
      basket = await this.basketRepository.save(newBasket);
    }

    for (const item of items) {
      const { price, productId, quantity } = item;

      const existingItem = await this.itemRepository.findOne({
        where: {
          basketId: basket.id,
          productId,
        },
      });

      if (existingItem) {
        await this.itemRepository.update(
          { id: existingItem.id },
          { quantity, price },
        );
      } else {
        const newItem = this.itemRepository.create({
          price,
          productId,
          quantity,
          basketId: basket.id,
        });
        basketItems.push(newItem);
      }
    }

    for (const item of basketItems) {
      await this.itemRepository.save(item);
    }

    return await this.itemRepository.find({
      where: { basketId: basket.id },
    });
  }

  async findAll(queryParams: PaginateQuery) {
    return await paginate(queryParams, this.basketRepository, {
      sortableColumns: ['createdAt'],
      defaultSortBy: [['createdAt', 'DESC']],
      relations: [
        'items',
        'user',
        'items.product',
        'items.product.category',
        'items.product.attributes',
        'items.product.discounts',
      ],
      filterableColumns: {
        userId: [FilterOperator.EQ],
        isCheckedOut: [FilterOperator.EQ],
      },
    });
  }

  async findOne(userId: number): Promise<Basket> {
    const userBasket = await this.basketRepository.findOne({
      where: { userId, isCheckedOut: false },
      relations: [
        'items',
        'user',
        'items.product',
        'items.product.category',
        'items.product.attributes',
        'items.product.discounts',
      ],
    });

    if (!userBasket) throw new NotFoundException('No basket for you');

    return userBasket;
  }

  async removeFromBasket(productId: number, userId: number) {
    const userBasket = await this.basketRepository.findOne({
      where: {
        userId,
      },
    });

    if (!userBasket)
      throw new BadRequestException('You don`t have basket yet !');

    const userBasketItem = await this.itemRepository.findOne({
      where: { productId, basketId: userBasket.id },
    });

    if (!userBasketItem)
      throw new NotFoundException('You didnt add this item to your basket');

    await this.itemRepository.delete({ id: userBasketItem.id });

    return { success: true };
  }
}
