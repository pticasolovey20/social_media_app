import { Query } from 'appwrite';
import { appwriteConfig, databases } from '@/lib/appwrite/config';

export async function getInfinitePosts({ pageParam }: { pageParam: number }) {
	const queries: string[] = [Query.orderDesc('$updatedAt'), Query.limit(9)];

	if (pageParam) {
		queries.push(Query.cursorAfter(pageParam.toString()));
	}

	try {
		const posts = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.postCollectionId,
			queries
		);

		if (!posts) throw Error;

		return posts;
	} catch (error) {
		console.log(error);
	}
}

export const searchPosts = async (searchTerm: string) => {
	try {
		const posts = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.postCollectionId,
			[Query.search('caption', searchTerm)]
		);

		if (!posts) throw Error;

		return posts;
	} catch (error) {
		console.log(error);
	}
};
