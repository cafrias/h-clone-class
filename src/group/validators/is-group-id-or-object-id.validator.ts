import {
	registerDecorator,
	ValidationOptions,
	ValidationArguments,
	isMongoId,
} from 'class-validator';
import { GROUP_ID_REGEX } from '../schemas/group.schema';

export function isGroupIdOrObjectId(value: string) {
	if (typeof value !== 'string') {
		return false;
	}

	if (isMongoId(value)) {
		return true;
	}

	if (GROUP_ID_REGEX.test(value)) {
		return true;
	}

	return false;
}

export function IsGroupIdOrObjectId(validationOptions?: ValidationOptions) {
	return function (object: object, propertyName: string) {
		registerDecorator({
			name: 'isGroupIdOrObjectId',
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			validator: {
				validate: isGroupIdOrObjectId,
				defaultMessage(args: ValidationArguments) {
					return `${args.property} must be either a valid MongoDB ObjectId (24 hex characters) or a valid group ID (matching pattern: group:name@domain)`;
				},
			},
		});
	};
}
