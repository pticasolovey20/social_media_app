import { PostForm } from '@/modules/post-form';

import { cn } from '@/lib/utils';

const CreatePost = () => {
	return (
		<div className="flex flex-1 w-full h-full">
			<div
				className={cn(
					'flex flex-col flex-1 items-center gap-10',
					'overflow-y-scroll overflow-x-hidden',
					'py-10 px-5 md:px-8 lg:p-14',
					'custom-scrollbar'
				)}
			>
				<div className="max-w-5xl w-full flex itams-start justify-start gap-3">
					<img src="/assets/icons/add-post.svg" width={36} height={36} alt="add" />
					<h2
						className={cn(
							'w-full',
							'text-[24px] md:text-[30px]',
							'font-bold leading-[140%] text-left'
						)}
					>
						Create Post
					</h2>
				</div>

				<PostForm action="Create" />
			</div>
		</div>
	);
};

export default CreatePost;
