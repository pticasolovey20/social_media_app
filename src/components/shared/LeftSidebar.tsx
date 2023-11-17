import { useEffect } from 'react';
import { useUserContext } from '@/context/AuthContext';
import { useSignOutAccount } from '@/lib/react-query/queries';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

import { sideBarLinks } from '@/constants';
import { INavLink } from '@/types';
import { cn } from '@/lib/utils';

import { Button } from '../ui/button';

const LeftSideBar = () => {
	const { mutate: signOut, isSuccess } = useSignOutAccount();
	const { user } = useUserContext();

	const { pathname } = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (isSuccess) navigate('sign-in');

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccess]);

	return (
		<nav
			className={cn(
				'hidden md:flex min-w-[270px]',
				'flex-col justify-between px-6 py-10 bg-dark-2'
			)}
		>
			<div className="flex flex-col gap-11">
				<Link to={`/profile/${user.id}`} className="flex items-center gap-3">
					<img
						src={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
						alt="user-avatar"
						width={170}
						height={36}
						className="h-14 w-14 rounded-full"
					/>

					<div className="flex flex-col">
						<p className="text-[18px] font-bold leading-[140%]">
							{user.name || 'Your name'}
						</p>
						<p className="text-[14px] font-normal leading-[140%] text-light-3">
							@{user.username || 'username'}
						</p>
					</div>
				</Link>

				{/* side navigation */}
				<ul className="flex flex-col gap-6">
					{sideBarLinks.map((link: INavLink) => {
						const { route, label, imgURL } = link;
						const isActive = pathname === route;

						return (
							<li
								key={label}
								className={cn(
									'text-white text-[16px] font-medium leading-[140%]',
									'rounded-lg hover:bg-primary-500 transition',
									isActive && 'bg-primary-500'
								)}
							>
								<NavLink
									to={route}
									className="flex items-center gap-4 p-4 text-white"
								>
									<img
										src={imgURL}
										alt={label}
										className="invert brightness-0 transition"
									/>

									{label}
								</NavLink>
							</li>
						);
					})}
				</ul>
			</div>

			{/* logout */}
			<Button
				variant="ghost"
				onClick={() => signOut()}
				className={cn(
					'flex gap-4 items-center justify-start',
					'hover:bg-transparent hover:text-white'
				)}
			>
				<img src="/assets/icons/logout.svg" alt="logout" />
				<p className={cn('font-medium leading-[140%]', 'text-[14px] lg:text-[16px]')}>
					Logout
				</p>
			</Button>
		</nav>
	);
};

export default LeftSideBar;
