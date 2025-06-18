import { ConflictException, Injectable } from '@nestjs/common';
import { FilterQuery, Model } from 'mongoose';
import { CreateGroupDto } from './dto/create-group.dto';
import { Group, GroupDocument } from './schemas/group.schema';
import { InjectModel } from '@nestjs/mongoose';
import { isMongoErrorWithKeyPattern } from 'src/errors/MongoErrorWithKeyPattern';
import { GetGroupsQueryDto } from './dto/get-groups.dto';

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
}
