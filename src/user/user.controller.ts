import {
	Body,
	Controller,
	Get,
	NotFoundException,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UserResponseDto } from './dto/user-reponse.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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

	@Patch(':userId')
	async updateUser(
		@Param() params: GetUserDto,
		@Body() updateUserDto: UpdateUserDto,
	): Promise<UserResponseDto> {
		const user = await this.userService.updateUser(
			params.userId,
			updateUserDto,
		);
		if (!user) {
			throw new NotFoundException(
				`User with userId ${params.userId} not found`,
			);
		}

		return UserResponseDto.create(user);
	}
}
