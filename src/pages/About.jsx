import { useTranslation } from "react-i18next";

import { soft, web, admin } from "../utils/data";
import List from "../components/List";
import EduNode from "../components/EduNode";
import Skive from "../assets/skive.png";
import VUT from "../assets/vut.png";

export default function About() {
  const { t } = useTranslation();

  return (
    <main className="mb-12">
      <section className="lg:flex justify-center border-2 bg-white bg-opacity-5 border-white lg:mx-20 mx-10 mt-6">
        <div className="lg:w-1/3 lg:border-r-2 border-white m-16 lg:mx-0 lg:px-16 px-0">
          <h2 className="text-2xl text-white font-bold tracking-widest mb-4">
            {t("soft")}
          </h2>
          <List props={soft} />
        </div>
        <div className="lg:w-1/3 lg:border-r-2 border-white m-16 lg:mx-0 lg:px-16 px-0">
          <h2 className="text-2xl text-white font-bold tracking-widest mb-4">
            {t("web")}
          </h2>
          <List props={web} />
        </div>
        <div className="lg:w-1/3 my-16 px-16">
          <h2 className="text-2xl text-white font-bold tracking-widest mb-4">
            {t("others")}
          </h2>
          <List props={admin} />
        </div>
      </section>
      <section className="flex flex-col place-items-center mt-20 mx-20 mb-10">
        <EduNode
          school={t("lyceum")}
          place={t("ru")}
          yrs="2018 - 2020"
          spec={t("lyceum_area")}
        />
        <div className="mx-auto w-0.5 h-28 bg-white my-10"></div>
        <EduNode
          school={t("skive")}
          place={t("dk")}
          yrs="2019"
          spec={t("skive_area")}
          img_left={Skive}
        />
        <div className="mx-auto w-0.5 h-28 bg-white my-10"></div>
        <EduNode
          school={t("vut")}
          place={t("cz")}
          yrs="2021 - ..."
          spec={t("vut_area")}
          img_right={VUT}
        />
      </section>
    </main>
  );
}
