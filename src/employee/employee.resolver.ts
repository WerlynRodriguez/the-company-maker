import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { EmployeeType } from 'src/schemas/employee.schema';
import { EmployeeService } from './employee.service';
import { Query } from '@nestjs/graphql';
import { CreateEmployeeArgs } from './dto/create-employee.args';
import { UpdateEmployeeArgs } from './dto/update-employee.args';
import { GetAllEmployeeArgs } from './dto/getall-employee.args';

@Resolver(() => EmployeeType)
export class EmployeeResolver {
  constructor(private readonly employeeService: EmployeeService) {}

  @Query(() => [EmployeeType])
  async employees(@Args() args: GetAllEmployeeArgs) {
    const { pagination, sortBy } = args;

    return this.employeeService.findAll(pagination, sortBy);
  }

  @Query(() => EmployeeType)
  async employee(@Args('id', { type: () => ID }) id: string) {
    return this.employeeService.findOne(id);
  }

  @Mutation(() => EmployeeType)
  async createEmployee(@Args() args: CreateEmployeeArgs) {
    return this.employeeService.create(args);
  }

  @Mutation(() => EmployeeType)
  async updateEmployee(@Args() args: UpdateEmployeeArgs) {
    const { id, input } = args;
    return this.employeeService.update(id, input);
  }

  @Mutation(() => EmployeeType)
  async deleteEmployee(@Args('id', { type: () => ID }) id: string) {
    return this.employeeService.remove(id);
  }
}
