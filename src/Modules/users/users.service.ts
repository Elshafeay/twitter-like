import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Op } from 'sequelize';
import { USER_REPOSITORY } from 'src/constants/constants';
import { Tweet } from 'src/models/tweet';
import { User } from 'src/models/user';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {

	constructor(
		@Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
	) { }
	
	async findOneById(id: string): Promise<User> {
		let user: User;
		try{
			user = await this.userRepository.findOne<User>({ where: { id } })
		}catch (e){
			if (e.parent.code === "22P02"){
				throw new BadRequestException() // Wrong UUID format
			}
		}

		if(!user){
			throw new NotFoundException("User Doesn't Exist")
		}
		return user

	}

	// Needs it for login (in auth.service)
	async findOneByEmail(email: string): Promise<User> {
		
		// validating email against regex
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!re.test(email)){
			throw new BadRequestException("Wrong Email Format")
		}

		const user = await this.userRepository.findOne<User>({ where: { email: email.toLowerCase() } });
		if(!user){
			throw new NotFoundException("Wrong Credentials")
		}
		return user
	}

	async findAll(): Promise<User[]> {
		return await this.userRepository.findAll()
	}

	// implementing the search feature by name, email or username. 
	async findByFiltering(query: string): Promise<User[]> {
		return await this.userRepository.findAll({
			where: {
				[Op.or]: [
					{
						name: {
							[Op.iLike]: `%${query}%` // used iLike to be case insensitive
						},
					},
					{
						username: {
							[Op.iLike]: `%${query}%`
						},
					},
					{
						email: {
							[Op.iLike]: `%${query}%`
						},
					}
				]
			}
		})
	}

	async findFollowing(id: string): Promise<User[]> {
		const user = await this.findOneById(id) // to use `findOneById` validations
		return user.$get('following')
	}

	async findFollowers(id: string): Promise<User[]> {
		const user = await this.findOneById(id) // to use `findOneById` validations
		return user.$get('followers')
	}

	async findTweets(id: string): Promise<Tweet[]> {
		const user = await this.findOneById(id) // to use `findOneById` validations
		return user.$get('tweets')
	}
	
	async createUser(createUserDto: CreateUserDto): Promise<User> {
		return await this.userRepository.create<User>(
			{
				...createUserDto,
				email: createUserDto.email.toLowerCase(),
				username: createUserDto.username.toLowerCase()
			}
		);
	}
	
	/* 
		acts like an on-off switch.
		so you can provide a user_id to follow, but If you're already following him,
		he would be removed from your following list. 
	*/
	async updateFollowing(userIdToFollow: string, userId: string): Promise<User> {
		const user = await this.findOneById(userId) // to use `findOneById` validations
		
		if (await user.$has('following', userIdToFollow)){
			await user.$remove('following', userIdToFollow)
		}else{
			await user.$add('following', userIdToFollow)
		}

		return user;
	}
	
}
