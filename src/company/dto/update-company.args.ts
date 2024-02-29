import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { IsNotEmptyObject, IsString, Length } from 'class-validator';

@InputType()
export class UpdateCompanyInput {
  @Field(() => String, {
    description: 'The name of the company',
    nullable: true,
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

@ArgsType()
export class UpdateCompanyArgs {
  @Field(() => String, {
    description: 'The id of the company',
  })
  @IsString()
  id: string;

  @Field(() => UpdateCompanyInput, {
    description: 'The data of the company',
  })
  @IsNotEmptyObject()
  input: UpdateCompanyInput;
}
