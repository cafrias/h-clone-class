import {
	IsEmail,
	IsNotEmpty,
	IsOptional,
	Matches,
	MaxLength,
	MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
	@IsNotEmpty()
	@ApiProperty({
		description: 'The authority of the user',
		example: 'localhost',
	})
	authority: string;

	@IsNotEmpty()
	@Matches(/^[a-zA-Z0-9]+$/)
	@MinLength(3)
	@MaxLength(30)
	@ApiProperty({
		description: 'The user name of the user',
		example: 'johndoe',
		minLength: 3,
		maxLength: 30,
		pattern: '^[a-zA-Z0-9]+$',
	})
	userName: string;

	@IsEmail()
	@IsNotEmpty()
	@ApiProperty({
		description: 'The email of the user',
		example: 'john.doe@example.com',
		format: 'email',
	})
	email: string;

	@IsOptional()
	@MaxLength(30)
	@ApiProperty({
		description: 'The display name of the user',
		example: 'John Doe',
		maxLength: 30,
	})
	displayName?: string;
}
