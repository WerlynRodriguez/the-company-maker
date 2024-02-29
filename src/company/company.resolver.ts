import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { CompanyService } from './company.service';
import { CompanyInput } from 'src/inputs/company.input';
import { Company } from 'src/schemas/company.schema';

@Resolver()
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) {}

  @Query(() => [Company])
  async companies() {
    return this.companyService.findAll();
  }

  @Query(() => Company)
  async company(@Args('id', { type: () => ID }) id: string) {
    return this.companyService.findOne(id);
  }

  @Mutation(() => Company)
  async createCompany(@Args('input') input: CompanyInput) {
    return this.companyService.create(input);
  }

  @Mutation(() => Company)
  async updateCompany(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: CompanyInput,
  ) {
    return this.companyService.update(id, input);
  }

  @Mutation(() => Company)
  async deleteCompany(@Args('id', { type: () => ID }) id: string) {
    return this.companyService.remove(id);
  }
}
