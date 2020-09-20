import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
	constructor(
		@Inject(forwardRef(() => UsersService))
		private readonly userService: UsersService,
		private readonly jwtService: JwtService,
	) { }

	async validateUser(email: string, pass: string) {

		// find if a user exist with this email
		const user = await this.userService.findOneByEmail(email);

		// find if the two passwords match (entered password && user's password) 
		const match = await this.comparePassword(pass, user.password);
		if (!match) {
			throw new NotFoundException("Wrong Credentials")
		}
		
		return await this.login(user)
	}

	public async login(user) {
		const token = await this.generateToken(user);
		return { user, token };
	}

	public async create(userData) {

		if(userData.password.length < 8){
			throw new BadRequestException("Password length must be 8 or more!")
		}
		// hash the password
		const pass = await this.hashPassword(userData.password);

		// create the user
		return await this.userService.createUser({ ...userData, password: pass });
	}

	private async generateToken(user) {
		const token = await this.jwtService.sign({id: user.id, email: user.email});
		return token;
	}

	private async hashPassword(password) {
		const hash = await bcrypt.hash(password, 10);
		return hash;
	}

	private async comparePassword(enteredPassword, dbPassword) {
		const match = await bcrypt.compare(enteredPassword, dbPassword);
		return match;
	}
}