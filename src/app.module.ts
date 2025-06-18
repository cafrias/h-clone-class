import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_URI } from './constants';
import { GroupModule } from './group/group.module';
import { SeedModule } from './seed/seed.module';

@Module({
	imports: [UserModule, MongooseModule.forRoot(MONGO_URI), GroupModule, SeedModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
