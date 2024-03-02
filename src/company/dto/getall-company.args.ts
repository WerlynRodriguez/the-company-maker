import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { PaginationArgs } from 'src/dto/pagination.args';
import { SortOrder } from 'src/dto/sorting.args';
import { IsSortByType } from 'src/validators/IsSortByType';

@InputType()
export class SortOrderInputCompany {
  @Field(() => SortOrder, {
    description: 'The sort order of the name (asc: a-z, desc: z-a)',
    nullable: true,
  })
  name?: SortOrder;
}

@ArgsType()
export class GetAllCompanyArgs extends PaginationArgs {
  @Field(() => SortOrderInputCompany, {
    nullable: true,
    description: 'The sort order of the companies, default ascending by name.',
    defaultValue: { name: SortOrder.asc },
  })
  @IsSortByType()
  sortBy?: SortOrderInputCompany;
}
