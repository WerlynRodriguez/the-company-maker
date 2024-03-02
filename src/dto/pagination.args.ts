import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import {
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';

@InputType()
export class PaginationInput {
  @Field(() => Int, {
    description: 'Page number (1 min) default 1',
    nullable: true,
    defaultValue: 1,
  })
  @IsNumber()
  @Min(1)
  page: number;

  @Field(() => Int, {
    description: 'Limit of items per page (1 min - 50 max), default 10',
    nullable: true,
    defaultValue: 10,
  })
  @IsNumber()
  @Max(50)
  @Min(1)
  limit: number;
}

@ArgsType()
export class PaginationArgs {
  @Field(() => PaginationInput, {
    description: 'Pagination options',
    nullable: true,
    defaultValue: {
      page: 1,
      limit: 10,
    },
  })
  @IsOptional()
  @IsNotEmptyObject()
  pagination?: PaginationInput;
}
