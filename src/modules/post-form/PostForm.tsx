import * as zod from 'zod';
import { Models } from 'appwrite';
import { useForm } from 'react-hook-form';
import { useToast } from '../../components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '@/context/AuthContext';
import { useCreatePost, useUpdatePost } from './queries';
import { zodResolver } from '@hookform/resolvers/zod';
import { PostValidation } from './validation';
import { cn } from '@/lib/utils';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../../components/ui/form';
import { Textarea } from '../../components/ui/textarea';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

import FileUploader from './components/FileUploader';
import Loader from '../../components/shared/Loader';

type PostFormProps = {
	post?: Models.Document;
	action: 'Create' | 'Update';
};

const PostForm = ({ post, action }: PostFormProps) => {
	const { mutateAsync: createPost, isPending: isLoadingCreate } = useCreatePost();
	const { mutateAsync: updatePost, isPending: isLoadingUpdate } = useUpdatePost();

	const { user } = useUserContext();
	const { toast } = useToast();

	const navigate = useNavigate();

	const form = useForm<zod.infer<typeof PostValidation>>({
		resolver: zodResolver(PostValidation),
		defaultValues: {
			caption: post ? post.caption : '',
			file: [],
			location: post ? post.location : '',
			tags: post ? post.tags.join(',') : '',
		},
	});

	const onSubmit = async (values: zod.infer<typeof PostValidation>) => {
		if (post && action === 'Update') {
			const updatedPost = await updatePost({
				...values,
				postId: post.$id,
				imageId: post?.imageId,
				imageUrl: post?.imageUrl,
			});

			if (!updatedPost) {
				toast({ title: 'Please try again' });
			}

			return navigate(`/posts/${post.$id}`);
		}

		const newPost = await createPost({ ...values, userId: user.id });

		if (!newPost) {
			toast({ title: 'Please try again' });
			return;
		}

		navigate('/');
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-9 w-full max-w-5xl"
			>
				<FormField
					control={form.control}
					name="caption"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-white">Caption</FormLabel>

							<FormControl>
								<Textarea
									{...field}
									className={cn(
										'h-36 rounded-xl border-none bg-dark-3',
										'ring-offset-light-3 custom-scrollbar',
										'focus-visible:ring-1 focus-visible:ring-offset-1 '
									)}
								/>
							</FormControl>

							<FormMessage className="text-[#FF5A5A]" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="file"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-white">Add Photos</FormLabel>

							<FormControl>
								<FileUploader
									{...field}
									fieldChange={field.onChange}
									mediaUrl={post?.imageUrl}
								/>
							</FormControl>

							<FormMessage className="text-[#FF5A5A]" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="location"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-white">Add Location</FormLabel>

							<FormControl>
								<Input
									type="text"
									{...field}
									className={cn(
										'h-12 border-none placeholder:text-light-4 bg-dark-4',
										'focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3'
									)}
								/>
							</FormControl>

							<FormMessage className="text-[#FF5A5A]" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="tags"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-white">
								Add Tags (separated by comma " , ")
							</FormLabel>

							<FormControl>
								<Input
									type="text"
									{...field}
									placeholder="Art, Expression, Learn"
									className={cn(
										'h-12 border-none placeholder:text-light-4 bg-dark-4',
										'focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3'
									)}
								/>
							</FormControl>

							<FormMessage className="text-[#FF5A5A]" />
						</FormItem>
					)}
				/>

				<div className="flex items-center justify-end gap-4">
					<Button
						type="button"
						className={cn('h-12 flex gap-2 bg-dark-4', 'px-5 text-light-1')}
					>
						Cancel
					</Button>

					<Button
						type="submit"
						disabled={isLoadingCreate || isLoadingUpdate}
						className={cn(
							'flex gap-2',
							'whitespace-nowrap text-light-1',
							'bg-primary-500 hover:bg-primary-500'
						)}
					>
						{isLoadingCreate || isLoadingUpdate ? (
							<div className="flex justify-center items-center gap-2">
								<Loader />
								Loading...
							</div>
						) : (
							<>{action} Post</>
						)}
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default PostForm;
