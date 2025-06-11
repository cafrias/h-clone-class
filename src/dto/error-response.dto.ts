import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
	@ApiProperty({
		description: 'The status code of the error',
		example: 409,
	})
	statusCode: number;

	@ApiProperty({
		description: 'The message of the error',
		example: 'Username `john_doe` is already taken',
	})
	message: string;

	@ApiProperty({
		description: 'The error message',
		example: 'Conflict',
	})
	error: string;
}
