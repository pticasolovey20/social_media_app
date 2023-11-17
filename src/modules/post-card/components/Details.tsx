import { Models } from 'appwrite';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '@/context/AuthContext';
import { useDeletePost } from '../../post-form/queries';

import { cn, multiFormatDateString } from '@/lib/utils';

import PostActions from './PostActions';

type PostDetailsProps = {
	id: string;
	post: Models.Document;
};

const Details = ({ id, post }: PostDetailsProps) => {
	const { mutate: deletePost } = useDeletePost();
	const { user } = useUserContext();

	const navigate = useNavigate();

	const handleDeletePost = () => {
		deletePost({ postId: id, imageId: post.imageId });
		navigate(-1);
	};

	return (
		<div
			className={cn(
				'w-full max-w-5xl',
				'flex flex-col xl:flex-row',
				'rounded-xl lg:rounded-3xl',
				'border border-dark-4 bg-dark-2'
			)}
		>
			<img
				src={post?.imageUrl}
				alt="creator"
				className={cn(
					'h-80 lg:h-[480px] xl:w-[48%]',
					'rounded-t-xl xl:rounded-l-3xl xl:rounded-tr-none',
					'object-cover bg-dark-1'
				)}
			/>

			<div
				className={cn(
					'flex-1 flex flex-col items-start',
					'p-8 rounded-[30px] bg-dark-2',
					'gap-5 lg:gap-7'
				)}
			>
				<div className={cn('w-full flex justify-between items-center', 'gap-4 sm:gap-0')}>
					<Link to={`/profile/${post?.creator.$id}`} className="flex items-center gap-3">
						<img
							src={post?.creator.imageUrl || '/assets/icons/profile-placeholder.svg'}
							alt="creator"
							className="w-8 h-8 lg:w-12 lg:h-12 rounded-full"
						/>

						<div className="flex gap-1 flex-col">
							<p
								className={cn(
									'font-medium leading-[140%] text-light-1',
									'text-[16px] lg:text-[18px]',
									'font-medium lg:font-bold'
								)}
							>
								{post?.creator.name}
							</p>

							<div
								className={cn(
									'flex flex-col xs:flex-row justify-center items-center',
									'gap-2 text-light-3'
								)}
							>
								<p
									className={cn(
										'leading-[140%]',
										'font-semibold lg:font-normal',
										'text-[12px] lg:text-[14px]'
									)}
								>
									{multiFormatDateString(post?.$createdAt)}
								</p>
								<p className="hidden xs:inline">•</p>
								<p
									className={cn(
										'leading-[140%]',
										'font-semibold lg:font-normal',
										'text-[12px] lg:text-[14px]'
									)}
								>
									{post?.location}
								</p>
							</div>
						</div>
					</Link>

					<div className="h-full flex items-start md:items-center self-end gap-4">
						<Link
							to={`/update-post/${post?.$id}`}
							className={`${user.id !== post?.creator.$id && 'hidden'}`}
						>
							<img src={'/assets/icons/edit.svg'} alt="edit" width={24} height={24} />
						</Link>

						<div
							role="button"
							onClick={handleDeletePost}
							className={cn(user.id !== post?.creator.$id && 'hidden')}
						>
							<img
								src={'/assets/icons/delete.svg'}
								alt="delete"
								width={24}
								height={24}
							/>
						</div>
					</div>
				</div>

				<hr className="w-full border border-dark-4/80" />

				<div
					className={cn(
						'flex flex-col flex-1 w-full leading-[140%]',
						'font-medium lg:font-normal',
						'text-[14px] lg:text-[16px] '
					)}
				>
					<p>{post?.caption}</p>

					<ul className="flex flex-col xs:flex-row gap-1 mt-2">
						{post?.tags.map((tag: string, index: string) => (
							<li
								key={`${tag}${index}`}
								className="text-light-3 text-[14px] font-normal leading-[140%]"
							>
								#{tag}
							</li>
						))}
					</ul>
				</div>

				<div className="w-full">
					<PostActions post={post} userId={user.id} />
				</div>
			</div>
		</div>
	);
};

export default Details;
