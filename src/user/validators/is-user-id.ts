import {
	registerDecorator,
	ValidationOptions,
	ValidationArguments,
} from 'class-validator';
import { USER_ID_REGEX } from '../schemas/user.schema';

export function IsUserId(validationOptions?: ValidationOptions) {
	return function (object: object, propertyName: string) {
		registerDecorator({
			name: 'isUserId',
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			validator: {
				validate(value: any) {
					if (typeof value !== 'string') {
						return false;
					}

					if (USER_ID_REGEX.test(value)) {
						return true;
					}

					return false;
				},
				defaultMessage(args: ValidationArguments) {
					return `${args.property} must be a valid user ID (matching pattern: acct:username@domain)`;
				},
			},
		});
	};
}
