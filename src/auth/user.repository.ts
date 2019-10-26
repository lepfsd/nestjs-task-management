import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

	async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
		const { username, password } = authCredentialsDto;
		const saltRounds = 10;

		const user = new User();
		user.username = username;
		user.salt = await bcrypt.genSaltSync(saltRounds);
		user.password = await this.hashPassword(password, user.salt);
		
		try {
			await user.save();
		} catch(error) {
			if(error.code === '23505') {
				throw new ConflictException('username already exists');
			} else {
				throw new InternalServerErrorException();
			}
		}	
	}

	async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string> {
		const { username, password } = authCredentialsDto;
		const user = await this.findOne({ username });
		//&& await user.validatePassword(password)
		if( user ) {
			return user.username;
		} else {
			return null;
		}
	}

	private async hashPassword (password: string, salt: string): Promise<string> {
		return bcrypt.hashSync(password, salt);
	}
}