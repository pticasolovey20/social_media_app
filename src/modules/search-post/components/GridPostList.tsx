import { Link } from 'react-router-dom';
import { useUserContext } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

import PostActions from '@/modules/post-card/components/PostActions';

type GridPostListProps = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	posts: any[];
	showUser?: boolean;
	showActions?: boolean;
};

const GridPostList = ({ posts, showUser = true, showActions = true }: GridPostListProps) => {
	const { user } = useUserContext();

	return (
		<ul
			className={cn(
				'w-full max-w-5xl grid gap-7',
				'grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'
			)}
		>
			{posts.map((post) => (
				<li key={post.$id} className="relative min-w-80 h-80">
					<Link
						to={`/posts/${post.$id}`}
						className={cn(
							'w-full h-full flex rounded-[24px]',
							'border border-dark-4 overflow-hidden cursor-pointer'
						)}
					>
						<img
							src={post.imageUrl}
							alt="post"
							className="w-full h-full object-cover"
						/>
					</Link>

					<div
						className={cn(
							'absolute bottom-0 w-full',
							'flex justify-between items-center gap-2',
							'p-5 rounded-b-[24px] bg-gradient-to-t from-dark-3 to-transparent'
						)}
					>
						{showUser && (
							<div className="flex-1 flex items-center justify-start gap-2 ">
								<img
									src={post.creator.imageUrl}
									alt="creator"
									className="h-8 w-8 rounded-full"
								/>

								<p className="line-clamp-1">{post.creator.name}</p>
							</div>
						)}

						{showActions && <PostActions post={post} userId={user.id} />}
					</div>
				</li>
			))}
		</ul>
	);
};

export default GridPostList;
