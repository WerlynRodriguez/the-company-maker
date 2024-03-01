import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { PaginationArgs } from 'src/dto/pagination.args';
import { SortOrder } from 'src/dto/sorting.args';

@InputType()
export class SortOrderInputEmployee {
  @Field(() => SortOrder, { nullable: true })
  firstName?: SortOrder;

  @Field(() => SortOrder, { nullable: true })
  lastName?: SortOrder;

  @Field(() => SortOrder, { nullable: true })
  age?: SortOrder;
}

@ArgsType()
export class GetAllEmployeeArgs extends PaginationArgs {
  @Field(() => SortOrderInputEmployee, {
    nullable: true,
    description: 'The sort order of the employees',
    defaultValue: { firstName: SortOrder.asc },
  })
  sortBy?: SortOrderInputEmployee;
}
