import dataSource from '@config/data-source';
import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
@Injectable()
export class UniqueConstraint implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    const repository = dataSource.getRepository(args.constraints[0]);
    const find: Record<string, any> = {};
    find[args.property] = value;
    const entity = await repository.findOneBy(find);
    return !entity;
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} most be an unique`;
  }
}

export function IsUnique(
  entityClass: any,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [entityClass],
      validator: UniqueConstraint,
    });
  };
}
