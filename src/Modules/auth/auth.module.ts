import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { AuthResolver } from './auth.resolver';

@Module({
	exports: [AuthService],
	imports: [
		PassportModule,
		UsersModule,
		JwtModule.register({
			secret: process.env.JWTKEY,
			signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
		}),
	],
	providers: [
		AuthService,
		AuthResolver,
		JwtStrategy
	],
})
export class AuthModule { }