import { appwriteConfig, databases, storage } from '@/lib/appwrite/config';
import { INewPost, IUpdatePost } from '@/types';
import { ID } from 'appwrite';

/** create post */

export const createPost = async (post: INewPost) => {
	try {
		const uploadedFile = await uploadFile(post.file[0]);
		if (!uploadedFile) throw Error;

		const fileUrl = getFilePreview(uploadedFile.$id);
		if (!fileUrl) {
			await deleteFile(uploadedFile.$id);
			throw Error;
		}

		const tags = post.tags?.replace(/ /g, '').split(',') || [];

		const newPost = await databases.createDocument(
			appwriteConfig.databaseId,
			appwriteConfig.postCollectionId,
			ID.unique(),
			{
				creator: post.userId,
				caption: post.caption,
				imageUrl: fileUrl,
				imageId: uploadedFile.$id,
				location: post.location,
				tags: tags,
			}
		);

		if (!newPost) {
			await deleteFile(uploadedFile.$id);
			throw Error;
		}

		return newPost;
	} catch (error) {
		console.log(error);
	}
};

/** upload file */

export const uploadFile = async (file: File) => {
	try {
		const uploadedFile = await storage.createFile(appwriteConfig.storageId, ID.unique(), file);

		return uploadedFile;
	} catch (error) {
		console.log(error);
	}
};

/** get file url */

export const getFilePreview = (fileId: string) => {
	try {
		const fileUrl = storage.getFilePreview(
			appwriteConfig.storageId,
			fileId,
			2000,
			2000,
			'top',
			100
		);

		if (!fileUrl) throw Error;

		return fileUrl;
	} catch (error) {
		console.log(error);
	}
};

/** delete file */

export const deleteFile = async (fileId: string) => {
	try {
		await storage.deleteFile(appwriteConfig.storageId, fileId);

		return { status: 'ok' };
	} catch (error) {
		console.log(error);
	}
};

/** get post by id */

export const getPostById = async (postId?: string) => {
	if (!postId) throw Error;

	try {
		const post = await databases.getDocument(
			appwriteConfig.databaseId,
			appwriteConfig.postCollectionId,
			postId
		);

		if (!post) throw Error;

		return post;
	} catch (error) {
		console.log(error);
	}
};

/** update post */

export const updatePost = async (post: IUpdatePost) => {
	const hasFileToUpdate = post.file.length > 0;
	try {
		let image = {
			imageUrl: post.imageUrl,
			imageId: post.imageId,
		};

		if (hasFileToUpdate) {
			const uploadedFile = await uploadFile(post.file[0]);
			if (!uploadedFile) throw Error;

			const fileUrl = getFilePreview(uploadedFile.$id);
			if (!fileUrl) {
				await deleteFile(uploadedFile.$id);
				throw Error;
			}

			image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
		}

		const tags = post.tags?.replace(/ /g, '').split(',') || [];

		const updatedPost = await databases.updateDocument(
			appwriteConfig.databaseId,
			appwriteConfig.postCollectionId,
			post.postId,
			{
				caption: post.caption,
				imageUrl: image.imageUrl,
				imageId: image.imageId,
				location: post.location,
				tags: tags,
			}
		);

		if (!updatedPost) {
			await deleteFile(post.imageId);
			throw Error;
		}

		return updatedPost;
	} catch (error) {
		console.log(error);
	}
};

/** delete post */

export const deletePost = async (postId: string, imageId: string) => {
	if (!postId || !imageId) throw Error;

	try {
		await databases.deleteDocument(
			appwriteConfig.databaseId,
			appwriteConfig.postCollectionId,
			postId
		);

		return { status: 'ok' };
	} catch (error) {
		console.log(error);
	}
};
