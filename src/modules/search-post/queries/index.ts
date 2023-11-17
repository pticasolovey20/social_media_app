import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/react-query/queryKeys';
import { searchPosts } from '../api';

export const useSearchPosts = (searchTerm: string) => {
	return useQuery({
		queryKey: [QUERY_KEYS.SEARCH_POSTS, searchTerm],
		queryFn: () => searchPosts(searchTerm),
		enabled: !!searchTerm,
	});
};
