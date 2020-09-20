import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { DatabaseModule } from '../database/database.module';
import { usersProviders } from './users.providers';

@Module({
	exports: [
		UsersService
	],
	imports: [
		DatabaseModule,
	],
	providers: [
		UsersService,
		UsersResolver,
		...usersProviders,
	]
})
export class UsersModule {}
