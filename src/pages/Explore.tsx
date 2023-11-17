import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

const Explore = () => {
	const [searchValue, setSearchValue] = useState<string>('');

	return (
		<div
			className={cn(
				'w-full flex-1 flex flex-col flex-grow items-center',
				'overflow-y-scroll overflow-x-hidden',
				'py-10 px-5 md:p-14',
				'custom-scrollbar'
			)}
		>
			<div className={cn('max-w-5xl w-full', 'flex flex-col items-center gap-6 md:gap-9')}>
				<h2
					className={cn(
						'font-bold leading-[140%] tracking-tighter w-full',
						'text-[24px] md:text-[30px]'
					)}
				>
					Search Post
				</h2>

				<div className="w-full flex gap-1 px-4 rounded-lg bg-dark-4">
					<img src="/assets/icons/search.svg" alt="search" width={24} height={24} />

					<Input
						type="text"
						placeholder="Search"
						value={searchValue}
						onChange={(event) => setSearchValue(event.target.value)}
						className={cn(
							'h-12 border-none bg-dark-4',
							'placeholder:text-light-4 ring-offset-0',
							'focus-visible:ring-0 focus-visible:ring-offset-0'
						)}
					/>
				</div>
			</div>

			<div
				className={cn(
					'w-full max-w-5xl',
					'flex justify-between items-center',
					'mt-16 mb-7'
				)}
			>
				<h3
					className={cn(
						'font-bold leading-[140%] ',
						'text-[18px] md:text-[24px] md:tracking-tighter'
					)}
				>
					Popular Today
				</h3>

				<div
					className={cn(
						'flex items-center justify-center gap-3',
						'px-4 py-2 rounded-xl bg-dark-3 cursor-pointer'
					)}
				>
					<p
						className={cn(
							'font-medium leading-[140%]',
							'text-[14px] md:text-[16px] text-light-2'
						)}
					>
						All
					</p>

					<img src="/assets/icons/filter.svg" alt="filter" width={20} height={20} />
				</div>
			</div>
		</div>
	);
};

export default Explore;
