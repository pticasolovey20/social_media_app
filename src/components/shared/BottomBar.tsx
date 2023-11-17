import { Link, useLocation } from 'react-router-dom';
import { bottomBarLinks } from '@/constants';
import { INavLink } from '@/types';
import { cn } from '@/lib/utils';

const BottomBar = () => {
	const { pathname } = useLocation();

	return (
		<section
			className={cn(
				'z-50 w-full px-5 py-4',
				'flex justify-between items-center ',
				'sticky bottom-0 rounded-t-[20px] bg-dark-2 md:hidden'
			)}
		>
			{bottomBarLinks.map((link: INavLink) => {
				const { route, label, imgURL } = link;
				const isActive = pathname === route;

				return (
					<Link
						to={route}
						key={label}
						className={cn(
							'flex flex-col justify-center items-center gap-1 p-2 transition',
							isActive && 'bg-primary-500 rounded-[10px]'
						)}
					>
						<img
							src={imgURL}
							alt={label}
							className="w-5 xs:w-6 h-5 xs:h-6 invert brightness-0 transition"
						/>

						<p className="text-[10px] font-medium leading-[140%] text-light-2">
							{label}
						</p>
					</Link>
				);
			})}
		</section>
	);
};

export default BottomBar;
