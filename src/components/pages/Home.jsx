import React from "react";
import { useTranslation } from 'react-i18next';

function Home() {
    const { t } = useTranslation();
    
    return (
        <main className="m-auto text-center">
            <h1 className="lg:text-8xl text-6xl pb-5">{t('Welcome')}.</h1>
            <p className="lg:text-5xl text-4xl pt-5 tracking-wide font-bold">{t('My name is Dmitrii Ivanushkin')}</p>
            <p className="lg:text-5xl text-4xl pt-5 tracking-wide font-bold">{t('I am a software developer')}</p>
        </main>
    );
}

export default Home;
