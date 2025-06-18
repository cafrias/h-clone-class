import { faker } from '@faker-js/faker';

export function generateGroupId(domains: string[]) {
	return `group:${faker.string.alphanumeric({
		length: { min: 3, max: 30 },
	})}@${faker.helpers.arrayElement(domains)}`;
}
