import {
	Body,
	Controller,
	Get,
	NotFoundException,
	Param,
	Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UserResponseDto } from './dto/user-reponse.dto';
import { GetUserDto } from './dto/get-user.dto';

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

	@Get(':userId')
	async getByUserId(@Param() params: GetUserDto): Promise<UserResponseDto> {
		const user = await this.userService.getUserByUserId(params.userId);
		if (!user) {
			throw new NotFoundException(
				`User with userId ${params.userId} not found`,
			);
		}

		return UserResponseDto.create(user);
	}
}
