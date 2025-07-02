import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Membership, MembershipDocument } from './schemas/membership.schema';
import { GetMembershipDto } from './dto/get-membership.dto';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { isMongoErrorWithKeyPattern } from 'src/errors/MongoErrorWithKeyPattern';
import { Group, GroupDocument } from './schemas/group.schema';
import { isMongoId } from 'class-validator';
import { UserService } from '../user/user.service';

@Injectable()
export class MembershipService {
	constructor(
		@InjectModel(Membership.name)
		private membershipModel: Model<MembershipDocument>,
		@InjectModel(Group.name)
		private groupModel: Model<GroupDocument>,
		private userService: UserService,
	) {}

	async createMembership(
		getDto: GetMembershipDto,
		createDto: CreateMembershipDto,
	): Promise<MembershipDocument> {
		// TODO: move higher
		let group: GroupDocument | null;
		if (isMongoId(getDto.id)) {
			group = await this.groupModel.findById(getDto.id);
		} else {
			group = await this.groupModel.findOne({
				groupId: getDto.id,
			});
		}

		if (!group) {
			throw new NotFoundException(`Group ${getDto.id} not found`);
		}

		const user = await this.userService.getUserByUserId(getDto.userId);

		if (!user) {
			throw new NotFoundException(`User ${getDto.userId} not found`);
		}

		try {
			return await this.membershipModel.create({
				group: group._id,
				user: user._id,
				roles: createDto.roles,
			});
		} catch (error) {
			if (isMongoErrorWithKeyPattern(error)) {
				if (error.keyPattern.groupId && error.keyPattern.userId) {
					throw new ConflictException(
						`User ${getDto.userId} is already a member of group ${getDto.id}`,
					);
				}
			}
			throw error;
		}
	}
}
