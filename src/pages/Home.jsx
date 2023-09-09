import React from 'react';
import { useTranslation } from 'react-i18next';

function Home() {
	const { t } = useTranslation();

	return (
		<main className="m-auto">
			<h1 className="lg:text-8xl text-6xl text-center pb-5">
				{t('home_welcome')}.
			</h1>
			<h2 className="lg:text-5xl text-4xl text-light text-center pt-5 tracking-wide font-bold">
				{t('home_name')}
			</h2>
			<h2 className="lg:text-5xl text-4xl text-light text-center pt-5 tracking-wide font-bold">
				{t('home_description')}
			</h2>
		</main>
	);
}

export default Home;
