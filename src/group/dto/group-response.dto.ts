import { ApiProperty } from '@nestjs/swagger';
import { GroupDocument } from '../schemas/group.schema';

export class GroupResponseDto {
	@ApiProperty({
		description: 'The ID of the group',
		format: 'MongoID',
		example: '123',
	})
	id: string;

	@ApiProperty({
		description: 'The group ID of the group',
		example: 'group:my_group@localhost',
		required: false,
	})
	groupId?: string;

	@ApiProperty({
		description: 'The name of the group',
		example: 'My Group',
	})
	name: string;

	@ApiProperty({
		description: 'The type of the group',
		enum: ['private', 'restricted', 'open'],
		example: 'private',
	})
	type: 'private' | 'restricted' | 'open';

	@ApiProperty({
		description: 'Whether the group is scoped',
		example: true,
	})
	scoped: boolean;

	static create(group: GroupDocument) {
		const dto = new GroupResponseDto();
		dto.id = group._id.toString();
		dto.groupId = group.groupId;
		dto.name = group.name;
		dto.type = group.type;
		dto.scoped = group.scoped;
		return dto;
	}
}
