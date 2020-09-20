import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from '../users/users.module';
import { TweetsModule } from '../tweets/tweets.module';
import { join } from 'path';
import { DatabaseModule } from '../database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';

@Module({
  	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		GraphQLModule.forRoot({
			typePaths: [
				'./**/*.graphql'
			],
			definitions: {
				path: join(process.cwd(), 'src/graphql.ts'),
				outputAs: 'class',
			},
			context: ({ req }) => ({ req }),
		}),
		DatabaseModule,
		UsersModule,
		TweetsModule,
		AuthModule,
	],
  	providers: [],
})
export class AppModule {}