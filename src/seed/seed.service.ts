import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { faker } from '@faker-js/faker';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { CreateGroupDto } from 'src/group/dto/create-group.dto';
import { GROUP_TYPES } from 'src/group/schemas/group.schema';
import { generateGroupId } from './utils/generate-group-id';
import { GroupService } from 'src/group/group.service';
import {
	FAKER_SEED,
	DEFAULT_USER_COUNT,
	SEED_AUTHORITIES,
	DEFAULT_GROUP_COUNT,
} from './constants';

@Injectable()
export class SeedService {
	constructor(
		private readonly userService: UserService,
		private readonly groupService: GroupService,
		@InjectConnection() private readonly connection: Connection,
	) {
		faker.seed(FAKER_SEED);
	}

	async seedUsers(numberOfUsers: number = DEFAULT_USER_COUNT) {
		await this.drop('users');

		const dtos: Array<CreateUserDto> = [];
		for (let i = 0; i < numberOfUsers; i++) {
			dtos.push({
				email: faker.internet.email(),
				// TODO: there may be a conflict here
				userName: faker.string.alphanumeric({
					length: { min: 3, max: 30 },
				}),
				authority: faker.helpers.arrayElement(SEED_AUTHORITIES),
				displayName: faker.helpers.maybe(() => faker.person.fullName()),
			});
		}

		await Promise.all(
			dtos.map(async (dto) => {
				return this.userService.createUser(dto);
			}),
		);
	}

	async seedGroups(numberOfGroups: number = DEFAULT_GROUP_COUNT) {
		await this.drop('groups');

		const dtos: Array<CreateGroupDto> = [];
		for (let i = 0; i < numberOfGroups; i++) {
			dtos.push({
				type: faker.helpers.arrayElement(GROUP_TYPES),
				name: faker.lorem.words(3),
				description: faker.lorem.sentence(),
				groupId: faker.helpers.maybe(() => generateGroupId(SEED_AUTHORITIES)),
			});
		}

		await Promise.all(dtos.map((dto) => this.groupService.createGroup(dto)));
	}

	private async drop(collectionName: string) {
		try {
			await this.connection.dropCollection(collectionName);
			console.log(`${collectionName} collection dropped successfully`);
		} catch {
			console.log(
				`${collectionName} collection does not exist or could not be dropped`,
			);
		}
	}
}
