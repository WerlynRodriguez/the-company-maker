import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsString, Length, Max, Min } from 'class-validator';

@InputType()
export class CreateEmployeeInput {
  @Field(() => String, {
    description: 'The first name of the employee',
  })
  @IsString()
  @Length(3, 50)
  firstName: string;

  @Field(() => String, {
    description: 'The last name of the employee',
  })
  @IsString()
  @Length(3, 50)
  lastName: string;

  @Field(() => Number, {
    description: 'The age of the employee',
  })
  @IsNumber()
  @Max(65)
  @Min(18)
  age: number;
}
