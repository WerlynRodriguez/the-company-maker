import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { EmployeeType } from 'src/schemas/employee.schema';
import { EmployeeService } from './employee.service';
import { Query } from '@nestjs/graphql';
import { CreateEmployeeInput } from './dto/create-employee.args';
import { UpdateEmployeeArgs } from './dto/update-employee.args';
import { GetAllEmployeeArgs } from './dto/getall-employee.args';

@Resolver(() => EmployeeType)
export class EmployeeResolver {
  constructor(private readonly employeeService: EmployeeService) {}

  @Query(() => [EmployeeType], {
    name: 'employees',
    description: 'Get all employees (paginated, sorted by field)',
  })
  async employees(@Args() args: GetAllEmployeeArgs) {
    const { pagination, sortBy } = args;

    return this.employeeService.findAll(pagination, sortBy);
  }

  @Query(() => EmployeeType, {
    name: 'employee',
    description: 'Get an employee by id',
  })
  async employee(@Args('id', { type: () => ID }) id: string) {
    return this.employeeService.findById(id);
  }

  @Mutation(() => EmployeeType, {
    name: 'createEmployee',
    description: 'Create a new employee',
  })
  async createEmployee(
    @Args('input', { type: () => CreateEmployeeInput })
    input: CreateEmployeeInput,
  ) {
    return this.employeeService.create(input);
  }

  @Mutation(() => EmployeeType, {
    name: 'updateEmployee',
    description: 'Update an employee by id',
  })
  async updateEmployee(@Args() args: UpdateEmployeeArgs) {
    const { id, input } = args;
    return this.employeeService.update(id, input);
  }

  @Mutation(() => EmployeeType, {
    name: 'deleteEmployee',
    description: 'Delete an employee by id',
  })
  async deleteEmployee(@Args('id', { type: () => ID }) id: string) {
    return this.employeeService.remove(id);
  }
}
