import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, Max, Min } from 'class-validator';

@InputType()
export class PaginationInput {
  @Field(() => Int, {
    nullable: true,
    defaultValue: 0,
  })
  @IsNumber()
  @Min(1)
  page: number;

  @Field(() => Int, {
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
    nullable: true,
    defaultValue: {
      page: 1,
      limit: 10,
    },
  })
  pagination?: PaginationInput;
}
