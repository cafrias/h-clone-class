import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Membership, MembershipDocument } from './schemas/membership.schema';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { isMongoErrorWithKeyPattern } from 'src/errors/MongoErrorWithKeyPattern';
import { Group, GroupDocument } from './schemas/group.schema';
import { UserService } from '../user/user.service';
import { UserDocument } from 'src/user/schemas/user.schema';

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
		group: GroupDocument,
		user: UserDocument,
		createDto: CreateMembershipDto,
	): Promise<MembershipDocument> {
		try {
			return await this.membershipModel.create({
				group: group._id,
				user: user._id,
				roles: createDto.roles,
			});
		} catch (error) {
			if (isMongoErrorWithKeyPattern(error)) {
				if (error.keyPattern.group && error.keyPattern.user) {
					throw new ConflictException(
						`User ${user.userId} is already a member of group ${group.groupId}`,
					);
				}
			}
			throw error;
		}
	}
}
