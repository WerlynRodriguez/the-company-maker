// *.Input.ts is a DTO (Data Transfer Object) file that is used to define the input types for the GraphQL mutations and queries.
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CompanyInput {
  @Field()
  name: string;
}
