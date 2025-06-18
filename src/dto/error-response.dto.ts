import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
	@ApiProperty({
		description: 'The status code of the error',
	})
	statusCode: number;

	@ApiProperty({
		description: 'The message of the error',
	})
	message: string;

	@ApiProperty({
		description: 'The error message',
	})
	error: string;
}
