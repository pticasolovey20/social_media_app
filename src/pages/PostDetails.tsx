import { useNavigate, useParams } from 'react-router-dom';
import { useGetPostById } from '@/modules/post-form/queries';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Details } from '@/modules/post-card';

import Loader from '@/components/shared/Loader';

const PostDetails = () => {
	const { id } = useParams();
	const { data: post, isLoading } = useGetPostById(id || '');

	const navigate = useNavigate();

	return (
		<div
			className={cn(
				'flex flex-col flex-grow items-center',
				'gap-10 overflow-y-scroll overflow-x-hidden',
				'py-10 px-5 md:p-14 custom-scrollbar'
			)}
		>
			<div className="hidden md:flex max-w-5xl w-full">
				<Button
					onClick={() => navigate(-1)}
					variant="ghost"
					className={cn(
						'flex items-center justify-start gap-4',
						'hover:bg-transparent hover:text-white'
					)}
				>
					<img src={'/assets/icons/back.svg'} alt="back" width={24} height={24} />
					<p className={cn('font-medium leading-[140%]', 'text-[14px] lg:text-[16px]')}>
						Back
					</p>
				</Button>
			</div>

			{isLoading || !post ? (
				<div className="w-full flex-1 flex items-center">
					<Loader />
				</div>
			) : (
				<Details id={id!} post={post} />
			)}
		</div>
	);
};

export default PostDetails;
