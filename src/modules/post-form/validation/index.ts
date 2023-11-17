import * as zod from 'zod';

export const PostValidation = zod.object({
	caption: zod.string().min(5).max(2200),
	file: zod.custom<File[]>(),
	location: zod.string().min(2).max(100),
	tags: zod.string(),
});
