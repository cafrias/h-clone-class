import { User } from '../schemas/user.schema';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
	@ApiProperty({
		description: 'The user ID of the user',
		example: 'acct:john_doe@localhost',
	})
	userId: string;

	@ApiProperty({
		description: 'The user name of the user',
		example: 'john_doe',
	})
	userName: string;

	@ApiProperty({
		description: 'The authority of the user',
		example: 'localhost',
	})
	authority: string;

	@ApiProperty({
		description: 'The email of the user',
		example: 'john.doe@example.com',
		format: 'email',
	})
	email: string;

	@ApiProperty({
		description: 'The display name of the user',
		example: 'John Doe',
	})
	displayName?: string;

	static create(user: User): UserResponseDto {
		return {
			userId: user.userId,
			userName: user.userName,
			authority: user.authority,
			email: user.email,
			displayName: user.displayName,
		};
	}
}
