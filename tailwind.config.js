/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['class'],

	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],

	theme: {
		extend: {
			screens: {
				xs: '400px',
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px',
				xxl: '1536px',
			},

			colors: {
				primary: {
					500: '#877EFF',
					600: '#5D5FEF',
				},

				secondary: {
					500: '#FFB620',
				},

				dark: {
					1: '#000000',
					2: '#09090A',
					3: '#101012',
					4: '#1F1F22',
				},

				light: {
					1: '#FFFFFF',
					2: '#EFEFEF',
					3: '#7878A3',
					4: '#5C5C7B',
				},
			},
		},
	},

	plugins: [],
};
