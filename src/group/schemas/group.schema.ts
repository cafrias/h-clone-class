import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GroupDocument = HydratedDocument<Group>;

export const GROUP_ID_REGEX = /group:[a-zA-Z0-9._\-+!~*()']{1,1024}@.*$/;

@Schema()
export class Group {
	@Prop({
		required: true,
		enum: ['private', 'restricted', 'open'],
		default: 'private',
	})
	type: 'private' | 'restricted' | 'open';

	@Prop({
		required: true,
		minLength: 3,
		maxLength: 250,
	})
	name: string;

	@Prop({
		required: false,
		maxLength: 250,
	})
	description?: string;

	@Prop({
		required: false,
		match: GROUP_ID_REGEX,
		unique: true,
	})
	groupId?: string;

	@Prop({
		required: true,
		type: {
			html: { type: String, required: true },
		},
	})
	links: { html: string };

	@Prop({
		required: true,
		default: false,
	})
	scoped: boolean;
}

export const GroupSchema = SchemaFactory.createForClass(Group);

GroupSchema.pre('validate', function (next) {
	// TODO: get baseURL from config
	this.links = { html: `https//localhost/group/${this.id}` };
	next();
});
