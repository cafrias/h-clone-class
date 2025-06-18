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
import {
	ApiConflictResponse,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
} from '@nestjs/swagger';
import { ErrorResponseDto } from 'src/dto/error-response.dto';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	@ApiCreatedResponse({
		description: 'The user has been successfully created.',
		type: UserResponseDto,
	})
	@ApiConflictResponse({
		description: 'The username or email is already taken.',
		type: ErrorResponseDto,
	})
	async createUser(
		@Body() createUserDto: CreateUserDto,
	): Promise<UserResponseDto> {
		const user = await this.userService.createUser(createUserDto);
		return UserResponseDto.create(user);
	}

	@Get(':userId')
	@ApiOkResponse({
		description: 'The user has been successfully retrieved.',
		type: UserResponseDto,
	})
	@ApiNotFoundResponse({
		description: 'The user with the given userId does not exist.',
		example: {
			statusCode: 404,
			message: 'User with userId acct:john_doe@example.com not found',
			error: 'Not Found',
		},
		type: ErrorResponseDto,
	})
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
	@ApiOkResponse({
		description: 'The user has been successfully updated.',
		type: UserResponseDto,
	})
	@ApiNotFoundResponse({
		description: 'The user with the given userId does not exist.',
		example: {
			statusCode: 404,
			message: 'User with userId acct:john_doe@example.com not found',
			error: 'Not Found',
		},
		type: ErrorResponseDto,
	})
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
