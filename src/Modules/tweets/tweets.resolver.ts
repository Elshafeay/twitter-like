import { UseGuards } from "@nestjs/common";
import { Query, ResolveField, Resolver, Args, Parent, Mutation } from "@nestjs/graphql";
import { Tweet } from "src/models/tweet";
import { User } from "src/models/user";
import { TweetsService } from "src/Modules/tweets/tweets.service";
import { CurrentUser, GqlAuthGuard } from "../auth/graphql.guard";
import { UsersService } from "../users/users.service";
import { CreateTweetDto } from "./dto/create-tweet.dto";

@Resolver('Tweet')
export class TweetsResolver {
	constructor(
		private tweetsService: TweetsService,
		private usersService: UsersService,
	) {}

	@UseGuards(GqlAuthGuard)
	@Query()
	tweet(@Args('id') id: string) {
		return this.tweetsService.findOneById(id);
	}

	@UseGuards(GqlAuthGuard)
	@Query()
	homeTweets(
		@Args('offset') offset: number,
		@Args('limit') limit: number,
		@CurrentUser() user: User
	) {
		if (offset !== null && limit !== null && offset >= 0 && limit >= 0){
			return this.tweetsService.findHomeTweet(user.id, offset, limit);
		}
		return this.tweetsService.findHomeTweet(user.id);
	}

	@UseGuards(GqlAuthGuard)
	@Query()
	userTweets(
		@Args('id') id: string,
		@Args('offset') offset: number,
		@Args('limit') limit: number
	) {
		if (offset !== null && limit !== null && offset >= 0 && limit >= 0){
			return this.tweetsService.findUserTweets(id, offset, limit);
		}
		return this.tweetsService.findUserTweets(id);
	}

	@UseGuards(GqlAuthGuard)
	@ResolveField('createdAt')
	createdAt(@Parent() tweet: Tweet) {
		return new Date(tweet.createdAt).toISOString().slice(0, 19).replace('T', ' ');
	}
	
	@UseGuards(GqlAuthGuard)
	@ResolveField('author')
	author(@Parent() tweet: Tweet) {
		const { authorId } = tweet;
		return this.usersService.findOneById(authorId);
	}
	
	@UseGuards(GqlAuthGuard)
	@ResolveField('fans')
	fans(@Parent() tweet: Tweet) {
		const { id } = tweet;
		return this.tweetsService.findFans(id);
	}
	
	@UseGuards(GqlAuthGuard)
	@Mutation()
	async createTweet(@CurrentUser() user: User, @Args('data') tweet: CreateTweetDto) {
		return this.tweetsService.createTweet(user.id, tweet);
	}

	@UseGuards(GqlAuthGuard)
	@Mutation()
	async deleteTweet(@CurrentUser() user: User, @Args('id') tweetId: string) {
		return this.tweetsService.deleteTweet(user.id, tweetId);
	}

	@UseGuards(GqlAuthGuard)
	@Mutation()
	async updateTweetLike(@CurrentUser() user: User, @Args('id') tweetId: string) {
		return this.tweetsService.updateTweetLike(user.id, tweetId);
	}

}