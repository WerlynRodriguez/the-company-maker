import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CompanyDocument = HydratedDocument<Company>;

@Schema()
export class Company {
  @Prop({
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  })
  name: string;
}

@ObjectType()
export class CompanyType {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
