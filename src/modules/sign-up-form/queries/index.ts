import { useMutation } from '@tanstack/react-query';
import { createUserAccount } from '../api';
import { INewUser } from '@/types';

export const useCreateUserAccount = () => {
	return useMutation({
		mutationFn: (user: INewUser) => createUserAccount(user),
	});
};
