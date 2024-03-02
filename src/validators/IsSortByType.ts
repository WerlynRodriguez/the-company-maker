import { registerDecorator, ValidationOptions } from 'class-validator';
import { SortOrder } from 'src/dto/sorting.args';

/**
 * A decorator that checks if the object is a valid SortOrderInput.
 * A valid SortOrderInput is !== {} and has all its properties as "asc" or "desc".
 */
export function IsSortByType(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsSortByType',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          return (
            typeof value === 'object' &&
            value !== null &&
            Object.keys(value).length > 0 &&
            Object.values(value).every((v) => (v as string) in SortOrder)
          );
        },
      },
    });
  };
}
