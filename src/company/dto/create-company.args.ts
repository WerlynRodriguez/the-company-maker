import { ArgsType, Field } from '@nestjs/graphql';
import { IsArray, IsMongoId, IsString, Length } from 'class-validator';

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
    defaultValue: [],
  })
  @IsArray()
  @IsMongoId({ each: true })
  employees: string[];
}
