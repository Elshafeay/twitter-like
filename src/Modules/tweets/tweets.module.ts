import { Module } from '@nestjs/common';
import { TweetsResolver } from './tweets.resolver';
import { TweetsService } from './tweets.service';
import { DatabaseModule } from '../database/database.module';
import { UsersModule } from '../users/users.module';
import { tweetsProviders } from './tweets.providers';
import { usersProviders } from '../users/users.providers';

@Module({
	exports: [
		TweetsService
	],
	imports: [
		UsersModule,
		DatabaseModule,
	],
	providers: [
		TweetsService,
		TweetsResolver,
		...tweetsProviders,
		...usersProviders
	]
})
export class TweetsModule {}
