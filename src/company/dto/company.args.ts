import { ArgsType, Field } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';

@ArgsType()
export class CompanyArgs {
  @Field(() => String, {
    description: 'The name of the company',
  })
  @IsString()
  @Length(3, 50)
  name: string;
}
