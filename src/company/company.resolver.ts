import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CompanyService } from './company.service';
import { CreateCompanyInput } from './dto/create-company.args';
import { UpdateCompanyArgs } from './dto/update-company.args';
import { CompanyType } from 'src/schemas/company.schema';
import { ModifyEmployToCompanyArgs } from './dto/modify-employtocompany.args';
import { EmployeeService } from 'src/employee/employee.service';
import { GetAllCompanyArgs } from './dto/getall-company.args';
import { EmployeeType } from 'src/schemas/employee.schema';

@Resolver(() => CompanyType)
export class CompanyResolver {
  constructor(
    private readonly companyService: CompanyService,
    private readonly employeeService: EmployeeService,
  ) {}

  /**
   * Get all companies (paginated, sorted by field)
   * @todo: Add filters (where) and search (search) to the query
   * @todo: implement control to employees field
   */
  @Query(() => [CompanyType], {
    name: 'companies',
    description: 'Get all companies (paginated, sorted by field)',
  })
  async companies(@Args() args: GetAllCompanyArgs) {
    const { pagination, sortBy } = args;

    return this.companyService.findAll(pagination, sortBy);
  }

  @Query(() => CompanyType, {
    name: 'company',
    description: 'Get a company by id',
  })
  async company(@Args('id', { type: () => ID }) id: string) {
    return this.companyService.findById(id);
  }

  @Mutation(() => CompanyType, {
    name: 'createCompany',
    description: 'Create a new company',
  })
  async createCompany(
    @Args('input', { type: () => CreateCompanyInput })
    input: CreateCompanyInput,
  ) {
    return this.companyService.create(input);
  }

  @Mutation(() => CompanyType, {
    name: 'updateCompany',
    description: 'Update a company by id',
  })
  async updateCompany(@Args() args: UpdateCompanyArgs) {
    const { id, input } = args;
    return this.companyService.update(id, input);
  }

  @Mutation(() => CompanyType, {
    name: 'deleteCompany',
    description: 'Delete a company by id',
  })
  async deleteCompany(@Args('id', { type: () => ID }) id: string) {
    return this.companyService.remove(id);
  }

  @Mutation(() => CompanyType, {
    name: 'addEmployeesToCompany',
    description: 'Add multiple employees to a company by id',
  })
  async addEmployeesToCompany(@Args() args: ModifyEmployToCompanyArgs) {
    const { id, employeeIds } = args;
    return this.companyService.addEmployees(id, employeeIds);
  }

  @Mutation(() => CompanyType, {
    name: 'removeEmployeesFromCompany',
    description: 'Remove multiple employees from a company by id',
  })
  async removeEmployeesFromCompany(@Args() args: ModifyEmployToCompanyArgs) {
    const { id, employeeIds } = args;
    return this.companyService.removeEmployees(id, employeeIds);
  }

  @ResolveField('employees', () => [EmployeeType], {
    description: 'Get all employees of a company',
  })
  async employees(@Parent() company: CompanyType) {
    return this.employeeService.findMany(company.employees);
  }
}
