import { account } from './config';

/** sign out */

export const signOutAccount = async () => {
	try {
		const session = await account.deleteSession('current');
		return session;
	} catch (error) {
		console.log(error);
	}
};
