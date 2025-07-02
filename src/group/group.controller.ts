import {
	Body,
	Controller,
	Get,
	NotFoundException,
	Param,
	Patch,
	Post,
	Query,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupResponseDto } from './dto/group-response.dto';
import {
	ApiConflictResponse,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
} from '@nestjs/swagger';
import { ErrorResponseDto } from '../dto/error-response.dto';
import { GetGroupsQueryDto } from './dto/get-groups.dto';
import { GetGroupDto } from './dto/get-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { MembershipService } from './membership.service';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { MembershipResponseDto } from './dto/membership-response.dto';
import { GetMembershipDto } from './dto/get-membership.dto';

@Controller('group')
export class GroupController {
	constructor(
		private readonly groupService: GroupService,
		private readonly membershipService: MembershipService,
	) {}

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

	@Get(':id')
	@ApiOkResponse({ type: GroupResponseDto })
	@ApiNotFoundResponse({
		type: ErrorResponseDto,
		example: {
			statusCode: 404,
			message: 'Group 123 not found',
			error: 'Not Found',
		},
	})
	async getGroup(@Param() getGroupDto: GetGroupDto): Promise<GroupResponseDto> {
		const group = await this.groupService.getGroup(getGroupDto.id);
		if (!group) {
			throw new NotFoundException(`Group ${getGroupDto.id} not found`);
		}

		return GroupResponseDto.create(group);
	}

	@Patch(':id')
	@ApiOkResponse({ type: GroupResponseDto })
	@ApiNotFoundResponse({
		type: ErrorResponseDto,
		example: {
			statusCode: 404,
			message: 'Group 123 not found',
			error: 'Not Found',
		},
	})
	@ApiConflictResponse({
		type: ErrorResponseDto,
		example: {
			statusCode: 409,
			message: 'Group ID already taken',
			error: 'Conflict',
		},
	})
	async updateGroup(
		@Param() getGroupDto: GetGroupDto,
		@Body() updateGroupDto: UpdateGroupDto,
	): Promise<GroupResponseDto> {
		const group = await this.groupService.updateGroup(
			getGroupDto.id,
			updateGroupDto,
		);
		if (!group) {
			throw new NotFoundException(`Group ${getGroupDto.id} not found`);
		}
		return GroupResponseDto.create(group);
	}

	@Post(':id/members/:userId')
	@ApiCreatedResponse({ type: MembershipResponseDto })
	async createMembership(
		@Param() getGroupDto: GetMembershipDto,
		@Body() createMembershipDto: CreateMembershipDto,
	) {
		const membership = await this.membershipService.createMembership(
			getGroupDto,
			createMembershipDto,
		);

		await membership.populate('user');

		return MembershipResponseDto.create(membership);
	}
}
