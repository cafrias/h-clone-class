import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IsGroupIdOrObjectId } from '../validators';

export class GetGroupDto {
	@IsString()
	@IsGroupIdOrObjectId()
	@ApiProperty({
		description: 'The ID or group ID of the group',
		example: '123',
	})
	id: string;
}
