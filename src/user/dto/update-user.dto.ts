import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateUserDto {
	@IsEmail()
	@IsOptional()
	@ApiProperty({
		description: 'The user email',
		example: 'john_doe@example.com',
		required: false,
	})
	email?: string;

	@IsString()
	@IsOptional()
	@MaxLength(30)
	@ApiProperty({
		description: 'The user display name',
		example: 'John Doe',
		required: false,
	})
	displayName?: string;
}
