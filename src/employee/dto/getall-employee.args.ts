import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { PaginationArgs } from 'src/dto/pagination.args';
import { SortOrder } from 'src/dto/sorting.args';
import { IsSortByType } from 'src/validators/IsSortByType';

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
  @IsOptional()
  @IsSortByType()
  sortBy?: SortOrderInputEmployee;
}
