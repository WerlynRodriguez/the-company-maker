import { ArgsType, Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmptyObject,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

@InputType()
export class UpdateEmployeeInput {
  @Field(() => String, {
    description: 'The first name of the employee',
    nullable: true,
  })
  @IsString()
  @Length(3, 50)
  firstName: string;

  @Field(() => String, {
    description: 'The last name of the employee',
    nullable: true,
  })
  @IsString()
  @Length(3, 50)
  lastName: string;

  @Field(() => Number, {
    description: 'The age of the employee',
    nullable: true,
  })
  @IsNumber()
  @Max(65)
  @Min(18)
  age: number;
}

@ArgsType()
export class UpdateEmployeeArgs {
  @Field(() => String, {
    description: 'The id of the employee',
  })
  @IsString()
  id: string;

  @Field(() => UpdateEmployeeInput, {
    description: 'The data of the employee',
  })
  @IsNotEmptyObject()
  input: UpdateEmployeeInput;
}
