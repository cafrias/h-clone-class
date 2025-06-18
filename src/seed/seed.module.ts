import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';
import { UserModule } from '../user/user.module';
import { GroupModule } from '../group/group.module';

// TODO: this module should be disabled in production
@Module({
	imports: [UserModule, GroupModule],
	controllers: [SeedController],
	providers: [SeedService],
})
export class SeedModule {}
