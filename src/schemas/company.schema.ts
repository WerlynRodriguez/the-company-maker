import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
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
    type: [String],
    default: [],
  })
  employees: string[];
}

@ObjectType('Company')
export class CompanyType {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => [EmployeeType])
  employees: string[];
}

export const CompanySchema = SchemaFactory.createForClass(Company);
