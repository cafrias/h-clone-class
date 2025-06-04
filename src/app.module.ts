import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_URI } from './constants';

@Module({
	imports: [UserModule, MongooseModule.forRoot(MONGO_URI)],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
