import { Field, ID, InputType } from '@nestjs/graphql';
import {
  IsArray,
  IsMongoId,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

@InputType()
export class CreateCompanyInput {
  @Field(() => String, {
    description: 'The name of the company (3-50 characters)',
  })
  @IsString()
  @Length(3, 50)
  name: string;

  @Field(() => [ID], {
    description: 'The employees ids of the company',
    nullable: true,
  })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  employees?: string[];
}
