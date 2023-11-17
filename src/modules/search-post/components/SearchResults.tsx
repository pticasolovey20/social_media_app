import { Models } from 'appwrite';

import Loader from '@/components/shared/Loader';
import { GridPostList } from '..';

type SearchResultsProps = {
	isSearchFetching: boolean;
	searchedPosts: Models.DocumentList<Models.Document> | undefined;
};

const SearchResults = ({ isSearchFetching, searchedPosts }: SearchResultsProps) => {
	if (isSearchFetching) {
		return (
			<div className="w-full flex-grow flex items-center">
				<Loader />
			</div>
		);
	}

	if (searchedPosts && searchedPosts.documents.length > 0) {
		return <GridPostList posts={searchedPosts.documents} />;
	}

	return <p className="text-light-4 text-center w-full mt-10">No results found</p>;
};

export default SearchResults;
