import { useTranslation } from "react-i18next";

import Box from "../components/Box";
import gol from "../assets/gol.png";
import web from "../assets/web.png";
import gnc from "../assets/gnc.png";

export default function Projects() {
  const { t } = useTranslation();

  return (
    <main className="flex items-center justify-center m-auto align-center">
      <section className="grid grid-cols-1 gap-12 mx-12 my-12 lg:grid-cols-3 md:grid-cols-2">
        <Box
          title={t("gol")}
          img={gol}
          yrs="2021"
          to="/projects/game-of-life/index.html"
          href="https://github.com/lasjdhu/game-of-life"
          desc={t("gol_description")}
        />
        <Box
          title={t("web_project")}
          img={web}
          yrs="2022 - ..."
          desc={t("web_description")}
        />
        <Box
          title={t("gnc")}
          img={gnc}
          yrs="2023 - ..."
          href="https://github.com/Cheloved/gnc"
          inProgress
          desc={t("gnc_description")}
        />
      </section>
    </main>
  );
}
