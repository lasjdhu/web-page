import { useTranslation } from "react-i18next";

import Box from "../components/Box";
import gol from "../assets/gol.png";
import gnc from "../assets/gnc.png";

export default function Projects() {
  const { t } = useTranslation();

  return (
    <main className="m-auto lg:mt-16 lg:mb-20 mt-12 mb-12 flex flex-col">
      <Box
        title={t("gol")}
        img={gol}
        yrs="2022"
        to="/projects/game-of-life"
        href="https://github.com/lasjdhu/game-of-life"
        desc={t("gol_description")}
        isEnabled={true}
      />
    </main>
  );
}
