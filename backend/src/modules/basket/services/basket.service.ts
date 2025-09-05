import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

    if (!basket) {
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
}
