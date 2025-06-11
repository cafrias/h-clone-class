import {
	IsEmail,
	IsNotEmpty,
	IsOptional,
	Matches,
	MaxLength,
	MinLength,
} from 'class-validator';

export class CreateUserDto {
	@IsNotEmpty()
	authority: string;

	@IsNotEmpty()
	@Matches(/^[a-zA-Z0-9]+$/)
	@MinLength(3)
	@MaxLength(30)
	userName: string;

	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsOptional()
	@MaxLength(30)
	displayName?: string;
}
