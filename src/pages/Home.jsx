import { useTranslation } from "react-i18next";

import Model from "../components/Model";

export default function Home() {
  const { t } = useTranslation();

  return (
    <main className="flex flex-col items-center justify-center m-auto lg:flex-row align-center">
      <div className="text-center lg:text-left lg:mr-12">
        <h1 className="pb-5 text-6xl font-bold tracking-wide lg:text-8xl">
          {t("home_welcome")}.
        </h1>
        <h1 className="pt-5 text-4xl font-bold tracking-wide lg:text-5xl">
          {t("home_name")}
        </h1>
        <h1 className="pt-5 text-4xl font-bold tracking-wide lg:text-5xl">
          {t("home_description")}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green to-accent">
            {t("software_developer")}
          </span>
        </h1>
      </div>
      <Model />
    </main>
  );
}
