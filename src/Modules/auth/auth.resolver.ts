import { Resolver, Args, Mutation } from "@nestjs/graphql";
import { AuthService } from "../auth/auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UserLoginDto } from "../users/dto/user-login.dto";

@Resolver('Auth')
export class AuthResolver {
	constructor(
		private authService: AuthService
	) {}
	
	// Mutation
	@Mutation()
	async signup(@Args('data') createUserDto: CreateUserDto) {
		return await this.authService.create(createUserDto);
	}
	
	@Mutation()
	async login(@Args('data') userLoginDto: UserLoginDto) {
		const { email, password } = userLoginDto
		return this.authService.validateUser(email, password);
	}

}