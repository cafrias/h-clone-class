import { ApiProperty } from '@nestjs/swagger';
import { IsUserId } from '../../user/validators/is-user-id';
import { IsGroupIdOrObjectId } from '../validators/is-group-id-or-object-id.validator';

export class GetMembershipDto {
	@IsUserId()
	@ApiProperty({
		description: 'The user ID',
		example: 'acct:john_doe@example.com',
	})
	userId: string;

	@IsGroupIdOrObjectId()
	@ApiProperty({
		description: 'The group ID or ObjectId',
		example: 'group:my_group@localhost',
	})
	id: string;
}
