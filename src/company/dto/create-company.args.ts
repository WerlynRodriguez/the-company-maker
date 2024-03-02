import { Field, ID, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsMongoId,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { RemoveSpaces } from 'src/validators/RemoveSpaces';

@InputType()
export class CreateCompanyInput {
  @Field(() => String, {
    description: 'The name of the company (3-50 characters)',
  })
  @Transform(RemoveSpaces)
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

  @Field(() => Date, {
    description:
      'Funded date, (default: now), format: 2024-03-02T17:56:56.827Z',
    nullable: true,
  })
  @IsOptional()
  @IsDate()
  foundedAt?: Date;
}
