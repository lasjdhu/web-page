import { useTranslation } from "react-i18next";

import Box from "../components/Box";

export default function Projects() {
  const { t } = useTranslation();

  return (
    <main className="lg:my-auto m-auto">
      <div className="lg:flex lg:flex-wrap">
        <Box
          title={t("gol")}
          to="/projects/game-of-life"
          src="https://github.com/lasjdhu/game-of-life"
          desc={t("gol_description")}
          isEnabled={true}
        />
        <Box
          title={t("gnc")}
          to="/"
          src="https://github.com/Cheloved/gnc"
          desc={t("gnc_description")}
          isEnabled={false}
        />
      </div>
    </main>
  );
}
