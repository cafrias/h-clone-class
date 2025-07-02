import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { GroupDocument } from './group.schema';
import { UserDocument } from '../../user/schemas/user.schema';

export type MembershipDocument = HydratedDocument<Membership>;

export const MEMBERSHIP_ROLES = [
	'admin',
	'member',
	'moderator',
	'owner',
] as const;
export type MembershipRole = (typeof MEMBERSHIP_ROLES)[number];

@Schema()
export class Membership {
	@Prop({
		required: true,
		type: MongooseSchema.Types.ObjectId,
		ref: 'Group',
	})
	group: GroupDocument;

	@Prop({
		required: true,
		type: MongooseSchema.Types.ObjectId,
		ref: 'User',
	})
	user: UserDocument;

	@Prop({
		required: true,
		type: [String],
		validate: (roles: string[]) => {
			return roles.every((role) =>
				MEMBERSHIP_ROLES.includes(role as MembershipRole),
			);
		},
	})
	roles: MembershipRole[];

	@Prop({
		required: true,
		default: Date.now,
	})
	createdAt: Date;

	@Prop({
		required: true,
		default: Date.now,
	})
	updatedAt: Date;
}

export const MembershipSchema = SchemaFactory.createForClass(Membership);

MembershipSchema.index({ group: 1, user: 1 }, { unique: true });
