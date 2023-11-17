import { useParams } from 'react-router-dom';
import { useGetPostById } from '@/modules/post-form/queries';
import { cn } from '@/lib/utils';

import { PostForm } from '@/modules/post-form';
import Loader from '@/components/shared/Loader';

const EditPost = () => {
	const { id } = useParams();
	const { data: post, isPending } = useGetPostById(id || '');

	if (isPending) return <Loader />;

	return (
		<div className="flex flex-1">
			<div
				className={cn(
					'flex flex-col flex-1 items-center gap-10',
					'overflow-scroll py-10 px-5 md:px-8 lg:p-14',
					'custom-scrollbar'
				)}
			>
				<div className="flex items-center justify-start gap-3 w-full max-w-5xl">
					<img src="/assets/icons/edit.svg" width={36} height={36} alt="edit" />
					<h2
						className={cn(
							'w-full',
							'text-[24px] md:text-[30px]',
							'font-bold leading-[140%] tracking-tighter; text-left'
						)}
					>
						Edit Post
					</h2>
				</div>

				<PostForm action="Update" post={post} />
			</div>
		</div>
	);
};

export default EditPost;
