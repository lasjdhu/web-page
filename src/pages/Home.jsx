import { useTranslation } from "react-i18next";

import Model from "../components/Model";

export default function Home() {
  const { t } = useTranslation();

  return (
    <main className="m-auto flex lg:flex-row flex-col justify-center align-center items-center">
      <div className="lg:text-left text-center lg:mr-12">
        <h1 className="lg:text-8xl text-6xl pb-5 tracking-wide font-bold">
          {t("home_welcome")}.
        </h1>
        <h1 className="lg:text-5xl text-4xl pt-5 tracking-wide font-bold">
          {t("home_name")}
        </h1>
        <h1 className="lg:text-5xl text-4xl pt-5 tracking-wide font-bold">
          {t("home_description")}
          <span className="text-accent">{t("software_developer")}</span>
        </h1>
      </div>
      <Model />
    </main>
  );
}
