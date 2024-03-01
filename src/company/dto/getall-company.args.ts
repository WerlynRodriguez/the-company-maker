import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { PaginationArgs } from 'src/dto/pagination.args';
import { SortOrder } from 'src/dto/sorting.args';

@InputType()
export class SortOrderInputCompany {
  @Field(() => SortOrder, { nullable: true })
  name?: SortOrder;
}

@ArgsType()
export class GetAllCompanyArgs extends PaginationArgs {
  @Field(() => SortOrderInputCompany, {
    nullable: true,
    description: 'The sort order of the companies',
    defaultValue: { name: SortOrder.asc },
  })
  sortBy?: SortOrderInputCompany;
}
