import * as zod from 'zod';

export const SignUpValidation = zod.object({
	name: zod.string().min(2, { message: 'Name must be at least 2 characters.' }),
	username: zod.string().min(2, { message: 'Username must be at least 2 characters.' }),
	email: zod.string().email(),
	password: zod.string().min(8, { message: 'Password must be at least 8 characters.' }),
});
