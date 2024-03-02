import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { PaginationArgs } from 'src/dto/pagination.args';
import { SortOrder } from 'src/dto/sorting.args';

@InputType()
export class SortOrderInputEmployee {
  @Field(() => SortOrder, {
    description: 'The sort order of the first name (asc: a-z, desc: z-a)',
    nullable: true,
  })
  firstName?: SortOrder;

  @Field(() => SortOrder, {
    description: 'The sort order of the last name (asc: a-z, desc: z-a)',
    nullable: true,
  })
  lastName?: SortOrder;

  @Field(() => SortOrder, {
    description: 'The sort order of the age (asc: 18-65, desc: 65-18)',
    nullable: true,
  })
  age?: SortOrder;
}

@ArgsType()
export class GetAllEmployeeArgs extends PaginationArgs {
  @Field(() => SortOrderInputEmployee, {
    nullable: true,
    description:
      'The sort order of the employees, default ascending by first name.',
    defaultValue: { firstName: SortOrder.asc },
  })
  sortBy?: SortOrderInputEmployee;
}
