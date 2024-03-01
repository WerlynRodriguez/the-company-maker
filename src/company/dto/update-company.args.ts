import { ArgsType, Field, InputType, PartialType } from '@nestjs/graphql';
import { IsMongoId, IsNotEmptyObject } from 'class-validator';
import { CreateCompanyInput } from './create-company.args';

@InputType()
export class UpdateCompanyInput extends PartialType(CreateCompanyInput) {}

@ArgsType()
export class UpdateCompanyArgs {
  @Field(() => String, {
    description: 'The id of the company',
  })
  @IsMongoId()
  id: string;

  @Field(() => UpdateCompanyInput, {
    description: 'The data of the company',
  })
  @IsNotEmptyObject()
  input: UpdateCompanyInput;
}
