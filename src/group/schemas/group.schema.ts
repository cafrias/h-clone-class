import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GroupDocument = HydratedDocument<Group>;

export const GROUP_ID_REGEX = /group:[a-zA-Z0-9._\-+!~*()']{1,1024}@.*$/;

export const GROUP_TYPES = ['private', 'restricted', 'open'] as const;

export type GroupType = (typeof GROUP_TYPES)[number];

@Schema()
export class Group {
	@Prop({
		required: true,
		enum: GROUP_TYPES,
		default: GROUP_TYPES[0],
	})
	type: GroupType;

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

	// TODO: include scopes https://h.readthedocs.io/en/latest/api-reference/v1/#tag/groups/paths/~1groups/get
}

export const GroupSchema = SchemaFactory.createForClass(Group);

GroupSchema.pre('validate', function (next) {
	// TODO: get baseURL from config
	this.links = { html: `https//localhost/group/${this.id}` };
	next();
});
