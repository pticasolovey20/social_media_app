import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useGetCurrentUser } from '@/lib/react-query/queries';
import { useDeleteSavedPost, useLikePost, useSavePost } from '../queries';
import { Models } from 'appwrite';
import { checkIsLiked, cn } from '@/lib/utils';

type PostActionsProps = {
	post: Models.Document;
	userId: string;
};

const PostActions = ({ post, userId }: PostActionsProps) => {
	const location = useLocation();
	const likesList = post.likes.map((user: Models.Document) => user.$id);

	const [likes, setLikes] = useState<string[]>(likesList);
	const [isSaved, setIsSaved] = useState(false);

	const { mutate: likePost } = useLikePost();
	const { mutate: savePost } = useSavePost();
	const { mutate: deleteSavePost } = useDeleteSavedPost();

	const { data: currentUser } = useGetCurrentUser();

	const savedPostRecord = currentUser?.save.find(
		(record: Models.Document) => record.post.$id === post.$id
	);

	useEffect(() => {
		setIsSaved(!!savedPostRecord);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentUser]);

	const handleLikePost = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
		event.stopPropagation();

		let likesArray = [...likes];

		if (likesArray.includes(userId)) {
			likesArray = likesArray.filter((Id) => Id !== userId);
		} else {
			likesArray.push(userId);
		}

		setLikes(likesArray);
		likePost({ postId: post.$id, likesArray });
	};

	const handleSavePost = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
		event.stopPropagation();

		if (savedPostRecord) {
			setIsSaved(false);
			return deleteSavePost(savedPostRecord.$id);
		}

		savePost({ userId: userId, postId: post.$id });
		setIsSaved(true);
	};

	const containerStyles = location.pathname.startsWith('/profile') ? 'w-full' : '';

	return (
		<div className={cn('flex justify-between items-center z-20', containerStyles)}>
			<div className="flex gap-2 mr-5">
				<img
					src={
						checkIsLiked(likes, userId)
							? '/assets/icons/liked.svg'
							: '/assets/icons/like.svg'
					}
					alt="like"
					width={20}
					height={20}
					onClick={handleLikePost}
					className="cursor-pointer"
				/>

				<p className={cn('font-medium leading-[140%]', 'text-[14px] lg:text-[16px]')}>
					{likes.length}
				</p>
			</div>

			<div className="flex gap-2">
				<img
					src={isSaved ? '/assets/icons/saved.svg' : '/assets/icons/save.svg'}
					alt="save"
					width={20}
					height={20}
					onClick={handleSavePost}
					className="cursor-pointer"
				/>
			</div>
		</div>
	);
};

export default PostActions;
