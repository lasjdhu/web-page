import React from "react";
import { useTranslation } from 'react-i18next';
import List from "../reusable/List";
import { langs, frameworks, others, edu } from "./data";

function About() {
    const { t } = useTranslation();

    return (
        <main className="m-auto">
            <section className="lg:flex justify-center">
                <div className="mt-10">
                    <h2 className="text-xl mb-3 font-bold tracking-widest">{t('EDUCATION')}</h2>
                    <List props={edu} />
                </div>
            </section>
            <section className="lg:flex justify-center">
                <div className="mt-20 lg:mr-32">
                    <h2 className="text-xl mb-3 font-bold tracking-widest">{t('LANGUAGES')}</h2>
                    <List props={langs}/>
                </div>
                <div className="mt-20 lg:mr-32">
                    <h2 className="text-xl font-bold tracking-widest">{t('FRAMEWORKS')}</h2>
                    <h2 className="text-xl mb-3 font-bold tracking-widest">{t('AND LIBRARIES')}</h2>
                    <List props={frameworks} />
                </div>
                <div className="mt-20 mb-10">
                    <h2 className="text-xl mb-3 font-bold tracking-widest">{t('OTHERS')}</h2>
                    <List props={others} />
                </div>
            </section>
        </main>
    );
}

export default About;