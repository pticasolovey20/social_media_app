import { Routes, Route } from 'react-router-dom';

import AuthLayout from './layouts/auth-layout/AuthLayout';
import RootLayout from './layouts/root-layout/RootLayout';

import { SignInForm } from './modules/sign-in-form';
import { SignUpForm } from './modules/sign-up-form';

import {
	Home,
	Explore,
	Saved,
	AllUsers,
	CreatePost,
	EditPost,
	PostDetails,
	Profile,
	UpdateProfile,
} from './pages';

import { Toaster } from '@/components/ui/toaster';

import './styles/globals.css';

const App = () => {
	return (
		<main className="flex flex-1 h-screen select-none">
			<Routes>
				<Route element={<AuthLayout />}>
					<Route path="sign-in" element={<SignInForm />} />
					<Route path="sign-up" element={<SignUpForm />} />
				</Route>

				<Route element={<RootLayout />}>
					<Route index element={<Home />} />
					<Route path="/explore" element={<Explore />} />
					<Route path="/saved" element={<Saved />} />
					<Route path="/all-users" element={<AllUsers />} />
					<Route path="/create-post" element={<CreatePost />} />
					<Route path="/update-post/:id" element={<EditPost />} />
					<Route path="/posts/:id" element={<PostDetails />} />
					<Route path="/profile/:id" element={<Profile />} />
					<Route path="/update-profile/:id" element={<UpdateProfile />} />
				</Route>
			</Routes>

			<Toaster />
		</main>
	);
};

export default App;
