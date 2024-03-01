import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsArray, IsMongoId, IsNotEmpty } from 'class-validator';

@ArgsType()
export class ModifyEmployToCompanyArgs {
  @Field(() => ID, {
    description: 'The id of the company',
  })
  @IsMongoId()
  id: string;

  @Field(() => [ID], {
    description: 'The ids of the employees',
  })
  @IsNotEmpty()
  @IsArray()
  @IsMongoId({ each: true })
  employeeIds: string[];
}
