import { ArgsType, Field, InputType, PartialType } from '@nestjs/graphql';
import { IsMongoId, IsNotEmptyObject } from 'class-validator';
import { CreateEmployeeInput } from './create-employee.args';

@InputType()
export class UpdateEmployeeInput extends PartialType(CreateEmployeeInput) {}

@ArgsType()
export class UpdateEmployeeArgs {
  @Field(() => String, {
    description: 'The id of the employee',
  })
  @IsMongoId()
  id: string;

  @Field(() => UpdateEmployeeInput, {
    description: 'The data of the employee',
  })
  @IsNotEmptyObject()
  input: UpdateEmployeeInput;
}
