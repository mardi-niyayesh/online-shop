import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ExpVsGlobalDiscountPipe implements PipeTransform {
  transform(value: any) {
    const { startDate, endDate, productId, categoryId } = value;
    if ((startDate && !endDate) || (!startDate && endDate)) {
      throw new BadRequestException('Enter both startDate & endDate');
    }

    if (categoryId && productId && !categoryId && productId) {
      throw new BadRequestException('Enter just one of productId , categoryId');
    }

    return value;
  }
}
