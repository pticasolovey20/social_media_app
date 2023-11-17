import * as zod from 'zod';
import { useForm } from 'react-hook-form';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserContext } from '@/context/AuthContext';
import { SignInValidation } from './validation';
import { useSignInAccount } from './queries';
import { cn } from '@/lib/utils';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import Loader from '@/components/shared/Loader';

const SignInForm = () => {
	const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
	const { mutateAsync: signInAccount, isPending } = useSignInAccount();
	const { toast } = useToast();

	const navigate = useNavigate();

	const form = useForm<zod.infer<typeof SignInValidation>>({
		resolver: zodResolver(SignInValidation),

		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (values: zod.infer<typeof SignInValidation>) => {
		const session = await signInAccount({ email: values.email, password: values.password });
		if (!session) {
			toast({ title: 'Sign ip failed. Please try again.' });
			return;
		}

		const isLoggedIn = await checkAuthUser();
		if (isLoggedIn) {
			form.reset();
			navigate('/');
		} else {
			toast({ title: 'Sign up failed. Please try again.' });
			return;
		}
	};

	return (
		<Form {...form}>
			<div
				className={cn(
					'w-[90%] xs:w-[75%] sm:w-[65%] md:w-[50%] lg:w-[420px]',
					'flex flex-col justify-center items-center'
				)}
			>
				<h2
					className={cn(
						'pt-5 sm:pt-12',
						'text-[24px] md:text-[30px]',
						'text-[24px] font-bold leading-[140%] tracking-tighter'
					)}
				>
					Log in to your account
				</h2>
				<p
					className={cn(
						'text-[14px] md:text-[16px] mt-2',
						'text-light-3 font-medium leading-[140%]'
					)}
				>
					Welcome back! Please enter your details.
				</p>

				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-full flex flex-col gap-5 mt-4"
				>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>

								<FormControl>
									<Input
										{...field}
										type="email"
										className={cn(
											'h-12 border-none bg-dark-4',
											'placeholder:text-light-4 ring-offset-light-3',
											'focus-visible:ring-1 focus-visible:ring-offset-1'
										)}
									/>
								</FormControl>

								<FormMessage className="text-[#FF5A5A]" />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>

								<FormControl>
									<Input
										{...field}
										type="password"
										className={cn(
											'h-12 border-none bg-dark-4',
											'placeholder:text-light-4 ring-offset-light-3',
											'focus-visible:ring-1 focus-visible:ring-offset-1'
										)}
									/>
								</FormControl>

								<FormMessage className="text-[#FF5A5A]" />
							</FormItem>
						)}
					/>

					<Button
						type="submit"
						className="flex gap-2 text-light-1 bg-primary-500 hover:bg-primary-500"
					>
						{isUserLoading || isPending ? (
							<div className="flex justify-center items-center gap-2">
								<Loader />
								Loading...
							</div>
						) : (
							'Sign In'
						)}
					</Button>

					<p className="text-[14px] font-normal leading-[140%] text-light-2 text-center mt-2">
						Don&apos;t have an account?
						<Link
							to="/sign-up"
							className="text-primary-500 text-[14px] font-semibold leading-[140%] tracking-tighter ml-1"
						>
							Sign Up
						</Link>
					</p>
				</form>
			</div>
		</Form>
	);
};

export default SignInForm;
