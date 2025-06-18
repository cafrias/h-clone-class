import { ApiProperty } from '@nestjs/swagger';
import { USER_ID_REGEX } from '../schemas/user.schema';
import { Matches } from 'class-validator';

export class GetUserDto {
	@Matches(USER_ID_REGEX, {
		message: 'Invalid user ID',
	})
	@ApiProperty({
		description: 'The user ID',
		example: 'acct:john_doe@example.com',
	})
	userId: string;
}
