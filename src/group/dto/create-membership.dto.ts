import { ApiProperty } from '@nestjs/swagger';
import { MEMBERSHIP_ROLES, MembershipRole } from '../schemas/membership.schema';
import { IsArray, IsEnum } from 'class-validator';

export class CreateMembershipDto {
	@IsArray()
	@IsEnum(MEMBERSHIP_ROLES, {
		each: true,
		message: `Invalid role. Must be one of: ${MEMBERSHIP_ROLES.join(', ')}`,
	})
	@ApiProperty({
		description: 'The roles of the membership',
		example: ['admin', 'member'],
	})
	roles: MembershipRole[];
}
