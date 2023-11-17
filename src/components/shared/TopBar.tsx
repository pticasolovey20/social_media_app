import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '@/context/AuthContext';
import { useSignOutAccount } from '@/lib/react-query/queries';
import { cn } from '@/lib/utils';

import { Button } from '../ui/button';

const TopBar = () => {
	const { mutate: signOut, isSuccess } = useSignOutAccount();
	const { user } = useUserContext();
	const navigate = useNavigate();

	useEffect(() => {
		if (isSuccess) navigate('sign-in');

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccess]);

	return (
		<section className={cn('w-full md:hidden bg-dark-2', 'sticky top-0 z-50')}>
			<div className="flex justify-end items-center py-4 px-5">
				<div className="flex gap-4">
					<Button
						variant="ghost"
						onClick={() => signOut()}
						className={cn(
							'flex gap-4 items-center justify-start',
							'hover:bg-transparent hover:text-white'
						)}
					>
						<img src="/assets/icons/logout.svg" alt="logout" />
					</Button>

					<Link
						to={`/profile/${user.id}`}
						className="flex justify-center items-center gap-3"
					>
						<img
							src={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
							alt="profile"
							className="h-8 w-8 rounded-full"
						/>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default TopBar;
