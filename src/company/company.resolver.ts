import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { CompanyService } from './company.service';
import { CompanyArgs } from './dto/company.args';
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
  async createCompany(@Args() args: CompanyArgs) {
    return this.companyService.create(args);
  }

  // @Mutation(() => Company)
  // async updateCompany(
  //   @Args('id', { type: () => ID }) id: string,
  //   @Args('input') input: CompanyArgs,
  // ) {
  //   return this.companyService.update(id, input);
  // }

  // @Mutation(() => Company)
  // async deleteCompany(@Args('id', { type: () => ID }) id: string) {
  //   return this.companyService.remove(id);
  // }
}
