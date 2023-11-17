import { useMutation, useQuery } from '@tanstack/react-query';

import { getCurrentUser } from '@/modules/sign-in-form/api';
import { getRecentPosts } from '@/modules/post-card/api';
import { signOutAccount } from '../appwrite/api';

import { QUERY_KEYS } from './queryKeys';

/** auth queries */

export const useSignOutAccount = () => {
	return useMutation({
		mutationFn: signOutAccount,
	});
};

/** user queries */

export const useGetCurrentUser = () => {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_CURRENT_USER],
		queryFn: getCurrentUser,
	});
};

/** post queries */

export const useGetRecentPosts = () => {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
		queryFn: getRecentPosts,
	});
};
