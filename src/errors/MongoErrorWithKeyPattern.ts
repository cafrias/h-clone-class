import { MongoError } from 'mongodb';

export interface MongoErrorWithKeyPattern extends MongoError {
	keyPattern: Record<string, number>;
}

export function isMongoErrorWithKeyPattern(
	error: any,
): error is MongoErrorWithKeyPattern {
	return error instanceof MongoError && 'keyPattern' in error;
}
