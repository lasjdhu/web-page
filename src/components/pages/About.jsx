import React from "react";
import { useTranslation } from "react-i18next";
import { RxDividerVertical } from "react-icons/rx";
import { langs, frameworks, others } from "../../data/skills";
import List from "../reusable/List";
import School from "../../img/school.png";
import Skive from "../../img/skive.png";
import VUT from "../../img/vut.png";

function About() {
    const { t } = useTranslation();

    return (
         <main className="mb-auto">
            <h1 className="lg:text-6xl text-4xl text-center my-16">{t("Skills")}</h1>
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
            <h1 className="lg:text-6xl text-4xl text-center my-16">{t("Education")}</h1>
            <section className="lg:flex mx-12">
                <div className="lg:w-1/3 text-center">
                    <h2 className="text-2xl text-white text-center tracking-widest">Business High School</h2>
                    <p className="text-gray text-center">Russia</p>
                    <p className="text-gray text-center">2018-2020</p>
                    <img src={School} alt="School.png" loading="lazy" className="h-20 w-auto mx-auto my-10" />
                </div>
                <RxDividerVertical className="lg:hidden mx-auto" size={90} />
                <div className="lg:w-1/3 text-center">
                    <h2 className="text-2xl text-white text-center tracking-widest lg:mt-0 mt-10">Skive College</h2>
                    <p className="text-gray text-center">Denmark</p>
                    <p className="text-gray text-center">2019</p>
                    <img src={Skive} alt="Skive-College.png" loading="lazy" className="h-20 w-auto mx-auto my-10" />
                </div>
                <RxDividerVertical className="lg:hidden mx-auto" size={90} />
                <div className="lg:w-1/3 text-center">
                    <h2 className="text-2xl text-white text-center tracking-widest lg:mt-0 mt-10">Brno University of Technology</h2>
                    <p className="text-gray text-center">Czech Republic</p>
                    <p className="text-gray text-center">2021-*</p>
                    <img src={VUT} alt="VUT-FIT.png" loading="lazy" className="h-20 w-auto mx-auto my-10" />
                </div>
            </section>
        </main>
    );
}

export default About;