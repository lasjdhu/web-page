/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			white: colors.white,
			black: colors.black,
			accent: '#FFCC00',
			midnight: '#0B223D',
			blue: '#3698A7',
			light: '#C5CBE3',
			gray: '#6B6E70',
		},
	},
	plugins: [],
};
