import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupResponseDto } from './dto/group-response.dto';
import {
	ApiConflictResponse,
	ApiCreatedResponse,
	ApiOkResponse,
} from '@nestjs/swagger';
import { ErrorResponseDto } from '../dto/error-response.dto';
import { GetGroupsQueryDto } from './dto/get-groups.dto';

@Controller('group')
export class GroupController {
	constructor(private readonly groupService: GroupService) {}

	@Post()
	@ApiCreatedResponse({ type: GroupResponseDto })
	@ApiConflictResponse({
		type: ErrorResponseDto,
		example: {
			statusCode: 409,
			message: 'Group ID already taken',
			error: 'Conflict',
		},
	})
	async createGroup(
		@Body() createGroupDto: CreateGroupDto,
	): Promise<GroupResponseDto> {
		const group = await this.groupService.createGroup(createGroupDto);
		return GroupResponseDto.create(group);
	}

	@Get()
	@ApiOkResponse({ type: [GroupResponseDto] })
	async getGroups(
		@Query() query: GetGroupsQueryDto,
	): Promise<GroupResponseDto[]> {
		const groups = await this.groupService.getGroups(query);
		return groups.map((group) => GroupResponseDto.create(group));
	}
}
