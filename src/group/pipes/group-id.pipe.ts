import {
	BadRequestException,
	Injectable,
	NotFoundException,
	PipeTransform,
} from '@nestjs/common';
import { GroupService } from '../group.service';
import { GroupDocument } from '../schemas/group.schema';
import { isGroupIdOrObjectId } from '../validators/is-group-id-or-object-id.validator';

@Injectable()
export class GroupIdPipe
	implements PipeTransform<string, Promise<GroupDocument>>
{
	constructor(private readonly groupService: GroupService) {}

	async transform(groupId: string): Promise<GroupDocument> {
		if (!isGroupIdOrObjectId(groupId)) {
			throw new BadRequestException('Invalid group ID');
		}

		const group = await this.groupService.getGroup(groupId);

		if (!group) {
			throw new NotFoundException(`Group with id ${groupId} not found`);
		}

		return group;
	}
}
