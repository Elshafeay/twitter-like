import { BadRequestException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Op } from 'sequelize';
import { TWEET_REPOSITORY, USER_REPOSITORY } from 'src/constants/constants';
import { Tweet } from 'src/models/tweet';
import { User } from 'src/models/user';
import { CreateTweetDto } from './dto/create-tweet.dto';

@Injectable()
export class TweetsService {

    constructor(
		@Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
		@Inject(TWEET_REPOSITORY) private readonly tweetRepository: typeof Tweet,
    ) { }
    
	async findOneById(id: string): Promise<Tweet> {
		let tweet: Tweet;
		try{
			tweet = await this.tweetRepository.findOne<Tweet>({ where: { id } })
		}catch (e){
			if (e.parent.code === "22P02"){
				throw new BadRequestException() // Wrong UUID format
			}
		}

		if(!tweet){
			throw new NotFoundException("Tweet Doesn't Exist")
		}
		return tweet


    }
	
	// retrieve the tweets of a certin user to show it on his profile
	async findUserTweets(userId: string, offset = 0, limit = 20): Promise<Tweet[]> {
		return await this.tweetRepository.findAll<Tweet>({
			where: { authorId: userId },
			order: [
				['createdAt', 'DESC']
			],
			offset: offset,
			limit: limit,
        })
	}

	// retrieve latest tweets from followings to show it in the home page 
	async findHomeTweet(userId: string, offset = 0, limit = 20): Promise<Tweet[]> {
		return await this.userRepository
		.findOne<User>({ where: { id: userId } })
		.then(
			user => user.$get('following')
			)
		.then(async (following) => {
			const followingIds = following.map(user => user.id);
			followingIds.push(userId);			
            return await this.tweetRepository.findAll<Tweet>({
                where: {
                    authorId: {
						[Op.in]: followingIds
					}
                },
                order: [
                    ['createdAt', 'DESC']
                ],
                offset: offset,
                limit: limit,
            })
        })
	}

	// retrieve the people who liked a certin tweet 
	async findFans(id: string,): Promise<User[]> {
		return await this.tweetRepository
		.findOne<Tweet>({ where: { id } })
		.then(
			tweet => tweet.$get('fans')
		);
	}

	async createTweet(userId: string,createTweetDto: CreateTweetDto): Promise<Tweet>{
        if (!createTweetDto.text && !createTweetDto.image){
            throw new Error("Tweet is empty!")
        }
		return await this.tweetRepository.create<Tweet>({
			...createTweetDto,
			authorId: userId
		});
	}
	
	async deleteTweet(userId: string, tweetId: string): Promise<Tweet>{
		const tweet = await this.findOneById(tweetId)
		
		if (tweet.authorId !== userId){
			throw new UnauthorizedException("It's not yours to delete!")
		}
		const lastGlance = tweet;
		tweet.destroy();

		return lastGlance
    }
	
	/* 
		acts like an on-off switch.
		so you can provide a tweet_id to be liked, but If It's already liked the like would be removed 
	*/
	async updateTweetLike(userId: string, tweetId: string): Promise<Tweet>{
		const tweet = await this.findOneById(tweetId)

		if (await tweet.$has('fans', userId)){
			await tweet.$remove('fans', userId)
			tweet.likes -= 1
			tweet.save()
		}else{
			await tweet.$add('fans', userId)
			tweet.likes += 1
			tweet.save()
		}

		return tweet
	}
}
