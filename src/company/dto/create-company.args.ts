import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsMongoId, IsString, Length } from 'class-validator';

@InputType()
export class CreateCompanyInput {
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
  @IsArray()
  @IsMongoId({ each: true })
  employees: string[];
}
