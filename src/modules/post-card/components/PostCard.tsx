import { Link } from 'react-router-dom';
import { useUserContext } from '@/context/AuthContext';
import { Models } from 'appwrite';
import { cn, multiFormatDateString } from '@/lib/utils';

import PostActions from './PostActions';

type PostCardProps = { post: Models.Document };

const PostCard = ({ post }: PostCardProps) => {
	const { user } = useUserContext();

	if (!post.creator) return;

	return (
		<div
			className={cn(
				'w-full max-w-screen-sm p-5 lg:p-7',
				'rounded-3xl lg:rounded-xl border border-dark-4 bg-dark-2'
			)}
		>
			{/* post description */}
			<div className="flex justify-between items-center">
				<div className="flex items-center gap-3">
					<Link to={`/profile/${post.creator.$id}`}>
						<img
							src={post?.creator?.imageUrl || '/assets/icons/profile-placeholder.svg'}
							alt="creator"
							className="w-12 lg:h-12 rounded-full"
						/>
					</Link>

					<div className="flex flex-col">
						<p
							className={cn(
								'leading-[140%] text-light-1',
								'font-medium lg:font-bold',
								'text-[16px] lg:text-[18px]'
							)}
						>
							{post.creator.name}
						</p>

						<div
							className={cn(
								'flex justify-center text-light-3',
								'flex-col lg:flex-row ',
								'items-start lg:items-center',
								'lg:gap-2'
							)}
						>
							<p
								className={cn(
									'leading-[140%]',
									'text-[12px] lg:text-[14px]',
									'font-semibold lg:font-normal'
								)}
							>
								{multiFormatDateString(post.$createdAt)}
							</p>
							<p className="hidden lg:inline">-</p>
							<p
								className={cn(
									'leading-[140%]',
									'text-[12px] lg:text-[14px]',
									'font-semibold lg:font-normal'
								)}
							>
								{post.location}
							</p>
						</div>
					</div>
				</div>

				<Link
					to={`/update-post/${post.$id}`}
					className={cn(user.id !== post.creator.$id && 'hidden')}
				>
					<img src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
				</Link>
			</div>

			{/* post image */}
			<Link to={`/posts/${post.$id}`}>
				<div
					className={cn('font-medium leading-[140%] py-5', 'text-[14px] lg:text-[16px]')}
				>
					<p>{post.caption}</p>

					<ul className="flex gap-4 mt-2">
						{post.tags.map((tag: string, index: number) => (
							<li key={`${tag} + ${index}`} className="text-light-3">
								#{tag}
							</li>
						))}
					</ul>
				</div>

				<img
					src={post.imageUrl || '/assets/icons/pofile-placeholder.svg'}
					alt="post-image"
					className={cn(
						'h-64 xs:h-[400px] lg:h-[450px] w-full',
						'rounded-[18px] lg:rounded-lg object-cover mb-5'
					)}
				/>
			</Link>

			{/* post actions */}
			<PostActions post={post} userId={user.id} />
		</div>
	);
};

export default PostCard;
