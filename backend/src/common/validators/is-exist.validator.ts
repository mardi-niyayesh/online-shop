import dataSource from '@config/data-source';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
@Injectable()
export class ExistenceConstraint implements ValidatorConstraintInterface {
  async validate(value: string, args: ValidationArguments): Promise<boolean> {
    const repository = dataSource.getRepository(args.constraints[0]);
    return await repository.exists({ where: { id: value } });
  }

  defaultMessage(args: ValidationArguments): string {
    throw new NotFoundException(`${args.property} not found`);
  }
}

export function Exists(
  entityClass: any,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [entityClass],
      validator: ExistenceConstraint,
    });
  };
}
