import { Module } from '@nestjs/common';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Group } from './schemas/group.schema';
import { GroupSchema } from './schemas/group.schema';
import { MembershipService } from './membership.service';
import { Membership, MembershipSchema } from './schemas/membership.schema';
import { UserModule } from 'src/user/user.module';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Group.name, schema: GroupSchema },
			{ name: Membership.name, schema: MembershipSchema },
		]),
		UserModule,
	],
	controllers: [GroupController],
	providers: [GroupService, MembershipService],
	exports: [GroupService],
})
export class GroupModule {}
