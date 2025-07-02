import { ApiProperty } from '@nestjs/swagger';
import { IsUserId } from '../validators/is-user-id';

export class GetUserDto {
	@IsUserId()
	@ApiProperty({
		description: 'The user ID',
		example: 'acct:john_doe@example.com',
	})
	userId: string;
}
