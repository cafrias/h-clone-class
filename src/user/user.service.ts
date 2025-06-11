import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { isMongoErrorWithKeyPattern } from '../errors/MongoErrorWithKeyPattern';

@Injectable()
export class UserService {
	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

	async createUser(user: CreateUserDto): Promise<UserDocument> {
		try {
			const newUser = await this.userModel.create(user);
			return newUser;
		} catch (error) {
			if (isMongoErrorWithKeyPattern(error)) {
				if (error.keyPattern.email) {
					throw new ConflictException('Email already taken');
				} else if (error.keyPattern.userId) {
					throw new ConflictException('User ID already taken');
				}
			}
			throw error;
		}
	}

	async getUserByUserId(userId: string): Promise<UserDocument | null> {
		return await this.userModel.findOne({ userId });
	}

	async updateUser(
		userId: string,
		updateUserDto: UpdateUserDto,
	): Promise<UserDocument | null> {
		const user = await this.getUserByUserId(userId);
		if (!user) {
			return null;
		}

		if (updateUserDto.email) {
			user.email = updateUserDto.email;
		}

		if (updateUserDto.displayName) {
			user.displayName = updateUserDto.displayName;
		}

		return await user.save();
	}
}
