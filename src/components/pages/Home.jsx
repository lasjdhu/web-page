import React from "react";
import { useTranslation } from 'react-i18next';

function Home() {
    const { t } = useTranslation();
    
    return (
        <div className="m-auto text-center">
            <h1 className="lg:text-8xl text-6xl pb-5">{t('Welcome.')}</h1>
            <hr className="lg:m-auto mx-10"/>
            <h1 className="lg:text-5xl text-4xl pt-5">{t('My name is Dmitrii Ivanushkin')}</h1>
            <h1 className="lg:text-5xl text-4xl pt-5">{t('I am a software developer')}</h1>
        </div>
    );
}

export default Home;