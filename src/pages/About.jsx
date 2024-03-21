import { useTranslation } from "react-i18next";

import { soft, web, admin } from "../utils/data";
import List from "../components/List";
import EduNode from "../components/EduNode";
import CertNode from "../components/CertNode";
import lyceum_logo from "../assets/lyceum_logo.png";
import Skive from "../assets/skive.png";
import VUT from "../assets/vut.png";
import MUNI from "../assets/muni.png";
import meta from "../assets/meta.png";
import gostudy from "../assets/gostudy.png";

export default function About() {
  const { t } = useTranslation();

  return (
    <main className="container mx-auto mt-12 mb-12 lg:mt-16 lg:mb-20">
      <section>
        <h1 className="mb-6 text-4xl text-center">{t("my_skills")}</h1>
        <div className="grid grid-cols-1 gap-8 p-12 mx-10 mt-6 bg-white rounded-md lg:grid-cols-3 bg-opacity-5">
          <div className="col-span-1 mt-6 ml-6 border-white lg:col-span-1 lg:mt-0 lg:border-r-2">
            <h2 className="mb-4 text-2xl font-bold tracking-widest text-white">
              {t("soft")}
            </h2>
            <List props={soft} />
          </div>

          <div className="col-span-1 ml-6 border-white lg:col-span-1 lg:border-r-2">
            <h2 className="mb-4 text-2xl font-bold tracking-widest text-white">
              {t("web")}
            </h2>
            <List props={web} />
          </div>

          <div className="col-span-1 ml-6 lg:col-span-1">
            <h2 className="mb-4 text-2xl font-bold tracking-widest text-white">
              {t("others")}
            </h2>
            <List props={admin} />
          </div>
        </div>
      </section>

      <section className="flex flex-col mx-10 mt-24 lg:mt-14 lg:flex-row">
        <h1 className="w-1/2 mb-8 text-4xl lg:mb-0">{t("education")}</h1>
        <div className="flex flex-col">
          <EduNode
            school={t("lyceum")}
            place={t("ru")}
            yrs="2018 - 2020"
            spec={t("lyceum_area")}
            img={lyceum_logo}
          />
          <div className="mt-12"></div>
          <EduNode
            school={t("skive")}
            place={t("dk")}
            yrs="2019"
            spec={t("skive_area")}
            img={Skive}
          />
          <div className="mt-12"></div>
          <EduNode
            school={t("vut")}
            place={t("cz")}
            yrs="2021 - ..."
            spec={t("vut_area")}
            img={VUT}
          />
        </div>
      </section>

      <section className="flex flex-col mx-10 mt-24 lg:flex-row">
        <h1 className="w-1/2 mb-8 text-4xl lg:mb-0">{t("work_experience")}</h1>
        <EduNode
          school={t("masaryk")}
          place={t("cz")}
          yrs="2023 - ..."
          spec={t("masaryk_area")}
          img={MUNI}
        />
      </section>

      <section className="flex flex-col mx-10 mt-24 lg:flex-row">
        <h1 className="w-1/2 mb-8 text-4xl lg:mb-0">{t("certificates")}</h1>
        <div className="flex flex-col">
          <CertNode
            school={t("meta")}
            yrs="2022"
            spec={t("meta_area")}
            href="https://www.coursera.org/account/accomplishments/verify/3WNLE62RK2LG"
            img={meta}
          />
          <div className="mt-12"></div>
          <CertNode
            school={t("gostudy")}
            yrs="2020 - 2021"
            spec={t("gostudy_area")}
            img={gostudy}
          />
        </div>
      </section>
    </main>
  );
}
