import * as zod from 'zod';

export const SignInValidation = zod.object({
	email: zod.string().email(),
	password: zod.string().min(8, { message: 'Password must be at least 8 characters.' }),
});
