import React from "react";
import { useTranslation } from 'react-i18next';
import List from "../reusable/List";
import { langs, frameworks, others, edu } from "./data";

function About() {
    const { t } = useTranslation();

    return (
        <main className="m-auto">
            <div className="lg:flex justify-center">
                <div className="mt-10">
                    <p className="text-xl mb-3 font-bold tracking-widest">{t('EDUCATION')}</p>
                    <List props={edu} />
                </div>
            </div>
            <div className="lg:flex justify-center">
                <div className="mt-20 lg:mr-32">
                    <p className="text-xl mb-3 font-bold tracking-widest">{t('LANGUAGES')}</p>
                    <List props={langs}/>
                </div>
                <div className="mt-20 lg:mr-32">
                    <p className="text-xl mb-3 font-bold tracking-widest">{t('FRAMEWORKS')}</p>
                    <List props={frameworks} />
                </div>
                <div className="mt-20 mb-10">
                    <p className="text-xl mb-3 font-bold tracking-widest">{t('OTHERS')}</p>
                    <List props={others} />
                </div>
            </div>
        </main>
    );
}

export default About;