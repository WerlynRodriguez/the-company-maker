import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { CompanyService } from './company.service';
import { CreateCompanyArgs } from './dto/create-company.args';
import { UpdateCompanyArgs } from './dto/update-company.args';
import { CompanyType } from 'src/schemas/company.schema';

@Resolver(() => CompanyType)
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) {}

  @Query(() => [CompanyType])
  async companies() {
    return this.companyService.findAll();
  }

  @Query(() => CompanyType)
  async company(@Args('id', { type: () => ID }) id: string) {
    return this.companyService.findOne(id);
  }

  @Mutation(() => CompanyType)
  async createCompany(@Args() args: CreateCompanyArgs) {
    return this.companyService.create(args);
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
}
