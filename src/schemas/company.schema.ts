import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { EmployeeType } from './employee.schema';

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

  @Prop({
    required: false,
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Employee',
    default: [],
  })
  employees: string[];

  /**
   * Funded date
   * @example 2021-01-01
   */
  @Prop({
    required: false,
    type: Date,
    default: Date.now,
  })
  foundedAt: Date;
}

@ObjectType('Company')
export class CompanyType {
  @Field(() => ID)
  id: string;

  @Field(() => String, {
    description: 'The name of the company (Not unique)',
  })
  name: string;

  @Field(() => [EmployeeType], {
    description: 'All employees of the company',
  })
  employees: string[];

  @Field(() => Date, {
    description:
      'Funded date, (default: now), format: 2024-03-02T17:56:56.827Z',
  })
  foundedAt: Date;
}

/*
@Prop({
  required: false,
  type: Date,
  default: Date.now,
})
foundedAt: Date;*/

export const CompanySchema = SchemaFactory.createForClass(Company);
