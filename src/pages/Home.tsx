import { Models } from 'appwrite';
import { useGetRecentPosts } from '../lib/react-query/queries';
import { cn } from '@/lib/utils';

import Loader from '@/components/shared/Loader';
import { PostCard } from '@/modules/post-card';

const Home = () => {
	const { data: posts, isLoading: isPostLoading } = useGetRecentPosts();

	return (
		<div className="flex flex-1 w-full h-full">
			<div
				className={cn(
					'flex flex-col flex-1 items-center gap-10',
					'overflow-y-scroll overflow-x-hidden py-10 px-5 md:px-8 lg:p-14',
					'custom-scrollbar'
				)}
			>
				<div className="max-w-screen-sm flex-1 w-full flex flex-col items-center gap-6 md:gap-9">
					<h2
						className={cn(
							'font-bold leading-[140%] tracking-tighter","text-[24px] md: text-[30px] text-left w-full'
						)}
					>
						Home Feed
					</h2>

					{isPostLoading && !posts ? (
						<div className="w-full flex-1 flex items-center">
							<Loader />
						</div>
					) : (
						<ul className="w-full flex flex-col flex-1 gap-9">
							{posts?.documents.map((post: Models.Document) => (
								<li key={post.$id} className="flex justify-center w-full">
									<PostCard post={post} />
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</div>
	);
};

export default Home;
