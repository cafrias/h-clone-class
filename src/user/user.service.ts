import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

	async createUser(user: CreateUserDto): Promise<UserDocument> {
		const newUser = await this.userModel.create(user);
		// TODO: handle conflict issues
		return newUser;
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
