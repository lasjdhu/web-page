import { useTranslation } from "react-i18next";

import blob from "../assets/blob-haikei.png";

export default function Home() {
  const { t } = useTranslation();

  return (
    <main className="lg:my-auto lg:ml-12 m-auto flex lg:flex-row flex-col">
      <div className="lg:text-left text-center lg:w-3/4 lg:mt-6">
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
      <img className="lg:w-1/4 lg:block hidden" alt="blob" src={blob} />
    </main>
  );
}
