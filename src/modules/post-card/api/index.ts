import { appwriteConfig, databases } from '@/lib/appwrite/config';
import { ID, Query } from 'appwrite';

/** get posts */

export const getRecentPosts = async () => {
	const posts = await databases.listDocuments(
		appwriteConfig.databaseId,
		appwriteConfig.postCollectionId,
		[Query.orderDesc('$createdAt'), Query.limit(20)]
	);

	if (!posts) throw Error;

	return posts;
};

/** like post */

export const likePost = async (postId: string, likesArray: string[]) => {
	try {
		const updatedPost = await databases.updateDocument(
			appwriteConfig.databaseId,
			appwriteConfig.postCollectionId,
			postId,
			{
				likes: likesArray,
			}
		);

		if (!updatedPost) throw Error;

		return updatedPost;
	} catch (error) {
		console.log(error);
	}
};

/** save post */

export const savePost = async (userId: string, postId: string) => {
	try {
		const updatedPost = await databases.createDocument(
			appwriteConfig.databaseId,
			appwriteConfig.savesCollectionId,
			ID.unique(),
			{ user: userId, post: postId }
		);

		if (!updatedPost) throw Error;

		return updatedPost;
	} catch (error) {
		console.log(error);
	}
};

/** delete saved post */

export const deleteSavedPost = async (savedRecordId: string) => {
	try {
		const statusCode = await databases.deleteDocument(
			appwriteConfig.databaseId,
			appwriteConfig.savesCollectionId,
			savedRecordId
		);

		if (!statusCode) throw Error;

		return { status: 'Ok' };
	} catch (error) {
		console.log(error);
	}
};
