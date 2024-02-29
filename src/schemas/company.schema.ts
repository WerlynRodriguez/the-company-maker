import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CompanyDocument = HydratedDocument<Company>;

@ObjectType()
@Schema()
export class Company {
  @Field()
  @Prop({
    required: true,
    trim: true,
  })
  name: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
