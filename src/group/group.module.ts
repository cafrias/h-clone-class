import { Module } from '@nestjs/common';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Group } from './schemas/group.schema';
import { GroupSchema } from './schemas/group.schema';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
	],
	controllers: [GroupController],
	providers: [GroupService],
})
export class GroupModule {}
