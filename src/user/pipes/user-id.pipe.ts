import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { UserService } from '../user.service';
import { UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserIdPipe
	implements PipeTransform<string, Promise<UserDocument>>
{
	constructor(private readonly userService: UserService) {}

	async transform(userId: string): Promise<UserDocument> {
		const user = await this.userService.getUserByUserId(userId);

		if (!user) {
			throw new NotFoundException(`User with userId ${userId} not found`);
		}

		return user;
	}
}
