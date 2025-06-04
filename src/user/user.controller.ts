import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UserResponseDto } from './dto/user-reponse.dto';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	async createUser(
		@Body() createUserDto: CreateUserDto,
	): Promise<UserResponseDto> {
		const user = await this.userService.createUser(createUserDto);
		return UserResponseDto.create(user);
	}
}
