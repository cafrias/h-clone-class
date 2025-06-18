import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class GetGroupsQueryDto {
	@IsOptional()
	@ApiProperty({
		description: 'The authority of the groups',
		example: 'localhost',
		required: false,
	})
	authority?: string;
}
