import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSavedPost, likePost, savePost } from '../api';
import { QUERY_KEYS } from '@/lib/react-query/queryKeys';

/** post queries */

export const useLikePost = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ postId, likesArray }: { postId: string; likesArray: string[] }) =>
			likePost(postId, likesArray),
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
			});

			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
			});

			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_POSTS],
			});

			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_CURRENT_USER],
			});
		},
	});
};

export const useSavePost = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ userId, postId }: { userId: string; postId: string }) =>
			savePost(userId, postId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
			});

			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_POSTS],
			});

			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_CURRENT_USER],
			});
		},
	});
};

export const useDeleteSavedPost = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (savedRecordId: string) => deleteSavedPost(savedRecordId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
			});

			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_POSTS],
			});

			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_CURRENT_USER],
			});
		},
	});
};
