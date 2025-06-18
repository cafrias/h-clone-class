import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

const USER_NAME_REGEX = /^[a-zA-Z0-9]+$/;

export function isValidUserName(userName: string): boolean {
	if (userName.length < 3 || userName.length > 30) {
		return false;
	}

	return USER_NAME_REGEX.test(userName);
}

export function isValidDisplayName(displayName: string | undefined): boolean {
	if (!displayName) {
		return true;
	}

	return displayName.length < 30;
}

export const USER_ID_REGEX =
	/^acct:[A-Za-z0-9._][A-Za-z0-9._]{1,28}[A-Za-z0-9_]@.*$/;

export function isValidUserId(userId: string): boolean {
	return USER_ID_REGEX.test(userId);
}

@Schema()
export class User {
	@Prop({
		required: true,
	})
	authority: string;

	@Prop({
		required: true,
		validate: isValidUserName,
	})
	userName: string;

	@Prop({
		required: true,
		unique: true,
		// TODO: handle email validation
	})
	email: string;

	@Prop({
		validate: isValidDisplayName,
	})
	displayName?: string;

	@Prop({
		required: true,
		unique: true,
		validate: isValidUserId,
	})
	userId: string;

	@Prop({
		required: true,
		default: false,
	})
	deleted: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('validate', function (next) {
	this.userId = `acct:${this.userName}@${this.authority}`;
	next();
});
