import { GroupDocument } from '../schemas/group.schema';

export class GroupResponseDto {
	id: string;
	groupId?: string;
	name: string;
	type: 'private' | 'restricted' | 'open';
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
