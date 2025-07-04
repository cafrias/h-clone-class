import { ConflictException, Injectable } from '@nestjs/common';
import { FilterQuery, Model } from 'mongoose';
import { CreateGroupDto } from './dto/create-group.dto';
import { Group, GROUP_ID_REGEX, GroupDocument } from './schemas/group.schema';
import { InjectModel } from '@nestjs/mongoose';
import { isMongoErrorWithKeyPattern } from 'src/errors/MongoErrorWithKeyPattern';
import { GetGroupsQueryDto } from './dto/get-groups.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupService {
	constructor(
		@InjectModel(Group.name) private groupModel: Model<GroupDocument>,
	) {}

	async createGroup(createGroupDto: CreateGroupDto) {
		try {
			return await this.groupModel.create(createGroupDto);
		} catch (error) {
			if (isMongoErrorWithKeyPattern(error)) {
				throw new ConflictException('Group ID already taken');
			}
			throw error;
		}
	}

	async getGroups(query: GetGroupsQueryDto) {
		const mongoQuery: FilterQuery<GroupDocument> = {};

		if (query.authority) {
			// TODO: optimize query
			mongoQuery.groupId = { $regex: `^group:.*@${query.authority}$` };
		}

		return await this.groupModel.find(mongoQuery);
	}

	/**
	 * Get a group by its ID or group ID
	 * @param idOrGroupId The ID or group ID of the group
	 * @returns The group
	 */
	async getGroup(idOrGroupId: string): Promise<GroupDocument | null> {
		if (GROUP_ID_REGEX.test(idOrGroupId)) {
			return await this.groupModel.findOne({ groupId: idOrGroupId });
		}

		return await this.groupModel.findById(idOrGroupId);
	}

	async updateGroup(
		idOrGroupId: string,
		updateGroupDto: UpdateGroupDto,
	): Promise<GroupDocument | null> {
		const group = await this.getGroup(idOrGroupId);
		if (!group) {
			return null;
		}

		if (updateGroupDto.groupId) {
			group.groupId = updateGroupDto.groupId;
		}

		if (updateGroupDto.name) {
			group.name = updateGroupDto.name;
		}

		if (updateGroupDto.description) {
			group.description = updateGroupDto.description;
		}

		if (updateGroupDto.type) {
			group.type = updateGroupDto.type;
		}

		try {
			await group.save();
			return group;
		} catch (error) {
			if (isMongoErrorWithKeyPattern(error)) {
				throw new ConflictException('Group ID already taken');
			}
			throw error;
		}
	}
}
