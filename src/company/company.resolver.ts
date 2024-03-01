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

@Resolver(() => CompanyType)
export class CompanyResolver {
  constructor(
    private readonly companyService: CompanyService,
    private readonly employeeService: EmployeeService,
  ) {}

  @Query(() => [CompanyType])
  async companies(@Args() args: GetAllCompanyArgs) {
    const { pagination, sortBy } = args;

    return this.companyService.findAll(pagination, sortBy);
  }

  @Query(() => CompanyType)
  async company(@Args('id', { type: () => ID }) id: string) {
    return this.companyService.findOne(id);
  }

  @Mutation(() => CompanyType)
  async createCompany(
    @Args('input', { type: () => CreateCompanyInput })
    input: CreateCompanyInput,
  ) {
    return this.companyService.create(input);
  }

  @Mutation(() => CompanyType)
  async updateCompany(@Args() args: UpdateCompanyArgs) {
    const { id, input } = args;
    return this.companyService.update(id, input);
  }

  @Mutation(() => CompanyType)
  async deleteCompany(@Args('id', { type: () => ID }) id: string) {
    return this.companyService.remove(id);
  }

  @Mutation(() => CompanyType)
  async addEmployeesToCompany(@Args() args: ModifyEmployToCompanyArgs) {
    const { id, employeeIds } = args;
    return this.companyService.addEmployees(id, employeeIds);
  }

  @Mutation(() => CompanyType)
  async removeEmployeesFromCompany(@Args() args: ModifyEmployToCompanyArgs) {
    const { id, employeeIds } = args;
    return this.companyService.removeEmployees(id, employeeIds);
  }

  @ResolveField()
  async employees(@Parent() company: CompanyType) {
    return this.employeeService.findMany(company.employees);
  }
}
