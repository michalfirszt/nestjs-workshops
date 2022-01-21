import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CurrentUserGql } from '../utilities/current-user-gql.decorator';
import { UserGraphqlAuthGuard } from '../auth/guards/user-graphql-auth.guard';
import { User } from '../user/user.entity';
import { FlowService } from './flow.service';
import { Flow } from './flow.entity';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class FlowResolver {
  constructor(private flowService: FlowService) {}

  @UseGuards(UserGraphqlAuthGuard)
  @Query(() => [Flow])
  flows(@CurrentUserGql() currentUser: User): Promise<Flow[]> {
    return this.flowService.findAllForUser(currentUser);
  }

  @UseGuards(UserGraphqlAuthGuard)
  @Query(() => Flow)
  flow(
    @Args({ name: 'id', type: () => ID }) id: number,
    @CurrentUserGql() currentUser: User,
  ): Promise<Flow> {
    return this.flowService.findForUser(id, currentUser);
  }

  @UseGuards(UserGraphqlAuthGuard)
  @Mutation(() => Flow)
  async flowDelete(
    @Args({ name: 'id', type: () => ID }) id: number,
    @CurrentUserGql() currentUser: User,
  ): Promise<Flow> {
    return this.flowService.delete(id, currentUser);
  }
}
