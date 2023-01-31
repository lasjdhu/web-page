import React from "react";
import { useTranslation } from 'react-i18next';

function About() {
    const { t } = useTranslation();

    return (
        <div className="my-10 mx-20">
            {/*<p className="text-3xl my-5">Graduated in Business IT<br/>
            Currently pursuing a Bachelor's Degree in Information Technology</p>*/}
            <div className="lg:flex justify-center">
                <div className="my-20 lg:mr-32">
                    <p className="text-xl mb-3 font-bold tracking-widest">{t('LANGUAGES')}</p>
                    <ul className="list-disc list-inside bg-gray">
                        <li>C/C++</li>
                        <li>HTML, CSS</li>
                        <li>JavaScript</li>
                        <li>Python</li>
                    </ul>
                </div>
                <div className="my-20 lg:mr-32">
                    <p className="text-xl mb-3 font-bold tracking-widest">{t('FRAMEWORKS')}</p>
                    <ul className="list-disc list-inside">
                        <li>React</li>
                        <li>TailwindCSS</li>
                        <li>Django</li>
                    </ul>
                </div>
                <div className="my-20">
                    <p className="text-xl mb-3 font-bold tracking-widest">{t('OTHERS')}</p>
                    <ul className="list-disc list-inside">
                        <li>Git</li>
                        <li>Linux administrating</li>
                        <li>UML</li>
                        <li>PostgreSQL</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default About;