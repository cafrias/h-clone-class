import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Matches } from 'class-validator';
import { GROUP_ID_REGEX } from '../schemas/group.schema';

export class UpdateGroupDto {
	@IsString()
	@IsOptional()
	@ApiProperty({
		description: 'The name of the group',
		example: 'My Group',
		required: false,
	})
	name?: string;

	@IsString()
	@IsOptional()
	@ApiProperty({
		description: 'The description of the group',
		example: 'This is a group',
		required: false,
	})
	description?: string;

	@IsString()
	@IsOptional()
	@ApiProperty({
		description: 'The type of the group',
		enum: ['private', 'restricted', 'open'],
		example: 'private',
		required: false,
	})
	type?: 'private' | 'restricted' | 'open';

	@IsString()
	@IsOptional()
	@Matches(GROUP_ID_REGEX)
	@ApiProperty({
		description: 'The group ID',
		required: false,
		format: GROUP_ID_REGEX.toString(),
		example: 'group:my_group@localhost',
	})
	groupId?: string;
}
