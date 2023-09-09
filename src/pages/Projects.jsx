import React from 'react';
import { useTranslation } from 'react-i18next';

import Box from '../components/Box';

function Projects() {
	const { t } = useTranslation();

	return (
		<main className="m-auto">
			<div className="flex lg:flex-row flex-col">
				<Box
					title={t('gol')}
					to="/projects/game-of-life"
					src="https://github.com/lasjdhu/game-of-life"
					desc={t('gol_description')}
					isEnabled={true}
				/>
				<Box
					title={t('gnc')}
					to="/"
					src="https://github.com/Cheloved/gnc"
					desc={t('gnc_description')}
					isEnabled={false}
				/>
			</div>
		</main>
	);
}

export default Projects;
