import { ArgsType, Field } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';

@ArgsType()
export class CreateCompanyArgs {
  @Field(() => String, {
    description: 'The name of the company',
  })
  @IsString()
  @Length(3, 50)
  name: string;

  @Field(() => [String], {
    description: 'The employees ids of the company',
    nullable: true,
  })
  @IsString({
    each: true,
    message: 'Employees must be a string',
  })
  employees: string[];
}
