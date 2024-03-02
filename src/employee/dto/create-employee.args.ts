import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsNumber, IsString, Length, Max, Min } from 'class-validator';
import { RemoveSpaces } from 'src/validators/RemoveSpaces';

@InputType()
export class CreateEmployeeInput {
  @Field(() => String, {
    description: 'The first name of the employee (3-50 characters)',
  })
  @IsString()
  @Length(3, 50)
  @Transform(RemoveSpaces)
  firstName: string;

  @Field(() => String, {
    description: 'The last name of the employee (3-50 characters)',
  })
  @IsString()
  @Length(3, 50)
  @Transform(RemoveSpaces)
  lastName: string;

  @Field(() => Number, {
    description: 'The age of the employee (18-65)',
  })
  @IsNumber()
  @Max(65)
  @Min(18)
  age: number;
}
