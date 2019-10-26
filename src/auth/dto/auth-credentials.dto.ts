import { IsNotEmpty, IsString, MinLength, MaxLength, Matches } from "class-validator";

export class AuthCredentialsDto {
	@IsNotEmpty()
	@IsString()
	@MinLength(4)
	@MaxLength(20)
	username: string;

	@IsNotEmpty()
	@IsString()
	@MinLength(7)
	@MaxLength(20)
	@Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/, {message: 'password weak'})
	password: string;
}

//https://www.w3resource.com/javascript/form/password-validation.php