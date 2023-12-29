import { useTranslation } from "react-i18next";

import Box from "../components/Box";
import gol from "../assets/gol.png";
import gnc from "../assets/gnc.png";

export default function Projects() {
  const { t } = useTranslation();

  return (
    <main className="m-auto">
      <div className="flex flex-col my-12">
        <Box
          title={t("gnc")}
          img={gnc}
          yrs="2023"
          to="/"
          href="https://github.com/Cheloved/gnc"
          desc={t("gnc_description")}
          isEnabled={false}
        />
        <div className="mt-12"></div>
        <Box
          title={t("gol")}
          img={gol}
          yrs="2022"
          to="/projects/game-of-life"
          href="https://github.com/lasjdhu/game-of-life"
          desc={t("gol_description")}
          isEnabled={true}
        />
      </div>
    </main>
  );
}
