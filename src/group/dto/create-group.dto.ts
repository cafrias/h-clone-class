import {
	IsString,
	IsOptional,
	IsNotEmpty,
	MinLength,
	MaxLength,
	IsEnum,
	Matches,
} from 'class-validator';
import { GROUP_ID_REGEX } from '../schemas/group.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGroupDto {
	@IsString()
	@IsNotEmpty()
	@MinLength(3)
	@MaxLength(25)
	@ApiProperty({
		description: 'The name of the group',
		example: 'My Group',
		required: true,
	})
	name: string;

	@IsString()
	@IsOptional()
	@MaxLength(250)
	@ApiProperty({
		description: 'The description of the group',
		example: 'This is a group for my friends',
		required: false,
	})
	description?: string;

	@IsString()
	@IsNotEmpty()
	@IsEnum(['private', 'restricted', 'open'])
	@ApiProperty({
		description: 'The type of the group',
		example: 'private',
		enum: ['private', 'restricted', 'open'],
		default: 'private',
		required: false,
	})
	type: 'private' | 'restricted' | 'open' = 'private';

	@IsOptional()
	@Matches(GROUP_ID_REGEX)
	@ApiProperty({
		description: 'The group ID of the group',
		example: 'group:my_group@localhost',
		required: false,
	})
	groupId?: string;
}
