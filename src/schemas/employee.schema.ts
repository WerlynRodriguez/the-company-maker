import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EmployeeDocument = HydratedDocument<Employee>;

@Schema()
export class Employee {
  @Prop({
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  })
  firstName: string;

  @Prop({
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  })
  lastName: string;

  @Prop({
    required: true,
    min: 18,
    max: 65,
  })
  age: number;
}

@ObjectType('Employee')
export class EmployeeType {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => Number)
  age: number;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
