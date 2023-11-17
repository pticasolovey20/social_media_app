import { account, appwriteConfig, databases } from '@/lib/appwrite/config';
import { Query } from 'appwrite';

/** sign in */

export const signInAccount = async (user: { email: string; password: string }) => {
	try {
		const session = await account.createEmailSession(user.email, user.password);
		return session;
	} catch (error) {
		console.log(error);
	}
};

/** get user */

export const getCurrentUser = async () => {
	try {
		const currentAccount = await account.get();

		if (!currentAccount) throw Error;

		const currentUser = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.userCollectionId,
			[Query.equal('accountId', currentAccount.$id)]
		);

		if (!currentUser) throw Error;

		return currentUser.documents[0];
	} catch (error) {
		console.log(error);
		return null;
	}
};
