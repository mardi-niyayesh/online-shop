// src/common/validators/is-start-before-end.validator.ts
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsStartBeforeEnd', async: false })
export class IsStartBeforeEndConstraint
  implements ValidatorConstraintInterface
{
  validate(_: any, args: ValidationArguments) {
    const object = args.object as any;
    const { startDate, endDate } = object;

    const hasStart = !!startDate;
    const hasEnd = !!endDate;

    const bothOrNone = (hasStart && hasEnd) || (!hasStart && !hasEnd);
    if (!bothOrNone) return false;

    if (hasStart && hasEnd) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      return start <= end;
    }

    return true;
  }

  defaultMessage(): string {
    return 'You must either provide both startDate and endDate, or neither. Also, startDate must not be after endDate.';
  }
}

export function IsStartBeforeEnd(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsStartBeforeEnd',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsStartBeforeEndConstraint,
    });
  };
}
