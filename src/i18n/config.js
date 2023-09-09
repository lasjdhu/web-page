import 'intl-pluralrules/polyfill';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslations from './locales/en.json';
import czTranslations from './locales/cz.json';

i18n.use(initReactI18next).init({
	fallbackLng: 'en',
	lng: 'en',
	resources: {
		en: {
			translations: enTranslations,
		},
		cz: {
			translations: czTranslations,
		},
	},
	ns: ['translations'],
	defaultNS: 'translations',
});

i18n.languages = ['en', 'cz'];

export default i18n;
