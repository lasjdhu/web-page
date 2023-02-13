import React from "react";
import { useTranslation } from "react-i18next";
import { langs, frameworks, others } from "../../data/skills";
import List from "../reusable/List";
import EduNode from "../reusable/EduNode";
import Skive from "../../img/skive.png";
import VUT from "../../img/vut.png";

function About() {
    const { t } = useTranslation();

    return (
         <main className="mb-auto">
            <h1 className="lg:text-8xl text-6xl text-center my-20">{t("Skills")}</h1>
            <section className="lg:flex justify-center border-2 bg-white bg-opacity-5 border-white lg:mx-20 mx-5">
                <div className="lg:w-1/3 lg:border-r-2 border-white m-16 lg:mx-0 lg:px-16 px-0">
                    <h2 className="text-2xl text-white mb-5 tracking-widest">{t("LANGUAGES")}</h2>
                    <List props={langs}/>
                </div>
                <div className="lg:w-1/3 lg:border-r-2 border-white m-16 lg:mx-0 lg:px-16 px-0">
                    <h2 className="text-2xl text-white tracking-widest">{t("FRAMEWORKS")},</h2>
                    <h2 className="text-2xl text-white tracking-widest">{t("LIBRARIES")}</h2>
                    <h2 className="text-2xl text-white mb-5 tracking-widest">{t("AND OTHERS")}</h2>
                    <List props={frameworks} />
                </div>
                <div className="lg:w-1/3 my-16 px-16">
                    <h2 className="text-2xl text-white mb-5 tracking-widest">{t("TOOLS")}</h2>
                    <List props={others} />
                </div>
            </section>
            <h1 className="lg:text-8xl text-6xl text-center my-20">{t("Education")}</h1>
            <section className="lg:flex mb-20">
                <EduNode school="Business High School" place="Russia" yrs="2018-2020" />
                <div id="divider-hor1" className="lg:hidden mx-auto w-0.5 h-32 bg-white my-10"></div>
                <EduNode school="Skive College" place="Denmark" yrs="2019" src={Skive} />
                <div id="divider-hor2" className="lg:hidden mx-auto w-0.5 h-32 bg-white my-10"></div>
                <EduNode school="Brno University of Technology" place="Czech Republic" yrs="2021-..." src={VUT} />
            </section>
        </main>
    );
}

export default About;