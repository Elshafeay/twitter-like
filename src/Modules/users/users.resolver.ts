import { UseGuards } from "@nestjs/common";
import { Query, ResolveField, Resolver, Args, Parent, Mutation } from "@nestjs/graphql";
import { User } from "src/models/user";
import { CurrentUser, GqlAuthGuard } from "../auth/graphql.guard";
import { UsersService } from "./users.service";

@Resolver('User')
export class UsersResolver {
	constructor(
		private usersService: UsersService,
	) {}
	
	@UseGuards(GqlAuthGuard)
	@Query()
	user(@Args('id') id: string) {
		return this.usersService.findOneById(id);
	}

	@UseGuards(GqlAuthGuard)
	@Query()
	profile(@CurrentUser() user: User) {
		return user;
	}

	@UseGuards(GqlAuthGuard)
	@Query('users')
	users(@Args('query') query: string) {
		if (query){
			return this.usersService.findByFiltering(query);
		}
		return this.usersService.findAll();
	}
	
	@UseGuards(GqlAuthGuard)
	@ResolveField('following')
	following(@Parent() user: User) {
		const { id } = user;
		return this.usersService.findFollowing(id);
	}
	
	@UseGuards(GqlAuthGuard)
	@ResolveField('followers')
	followers(@Parent() user: User) {
		const { id } = user;
		return this.usersService.findFollowers(id);
	}
	
	@UseGuards(GqlAuthGuard)
	@ResolveField('tweets')
	tweets(@Parent() user: User) {
		const { id } = user;
		return this.usersService.findTweets(id);
	}

	@UseGuards(GqlAuthGuard)
	@Mutation()
	async updateFollowing(@Args('id') userId: string, @CurrentUser() user: User) {
		console.log(user);
		return this.usersService.updateFollowing(userId, user.id);
	}

}