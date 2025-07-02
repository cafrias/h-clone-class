import { ApiProperty } from '@nestjs/swagger';
import {
	Membership,
	MEMBERSHIP_ROLES,
	MembershipRole,
} from '../schemas/membership.schema';

export class MembershipResponseDto {
	@ApiProperty({ type: String })
	authority: string;

	@ApiProperty({ type: String, example: 'acct:john_doe@example.com' })
	userId: string;

	@ApiProperty({ type: String, example: 'user_name' })
	userName: string;

	@ApiProperty({ type: String, example: 'John Doe' })
	displayName?: string;

	@ApiProperty({ enum: MEMBERSHIP_ROLES, example: ['admin', 'member'] })
	roles: MembershipRole[];

	@ApiProperty({ type: [String], example: ['delete', 'udpates.roles.member'] })
	actions: string[];

	@ApiProperty({ type: Date, example: new Date() })
	created: Date;

	@ApiProperty({ type: Date, example: new Date() })
	updated: Date;

	static create(membership: Membership): MembershipResponseDto {
		return {
			authority: membership.user.authority,
			userId: membership.user.userId,
			userName: membership.user.userName,
			displayName: membership.user.displayName,
			roles: membership.roles,
			// TODO: come back when dealing with ACL
			actions: [],
			created: membership.createdAt,
			updated: membership.updatedAt,
		};
	}
}
