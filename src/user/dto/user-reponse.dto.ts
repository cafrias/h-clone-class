import { User } from '../schemas/user.schema';

export class UserResponseDto {
	userId: string;
	userName: string;
	authority: string;
	email: string;
	displayName?: string;

	static create(user: User): UserResponseDto {
		return {
			userId: user.userId,
			userName: user.userName,
			authority: user.authority,
			email: user.email,
			displayName: user.displayName,
		};
	}
}
