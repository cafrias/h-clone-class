import { Controller, Post } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
	constructor(private readonly seedService: SeedService) {}

	@Post('user')
	async seedUsers() {
		await this.seedService.seedUsers();
	}

	@Post('group')
	async seedGroups() {
		await this.seedService.seedGroups();
	}
}
