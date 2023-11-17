import { useMutation } from '@tanstack/react-query';
import { signInAccount } from '../api';

export const useSignInAccount = () => {
	return useMutation({
		mutationFn: (user: { email: string; password: string }) => signInAccount(user),
	});
};
