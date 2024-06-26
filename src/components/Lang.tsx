import { useTranslation } from "react-i18next";

export default function Lang() {
  const { i18n } = useTranslation();

  function changeLanguage(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    const target = event.target as HTMLButtonElement;
    i18n.changeLanguage(target.value);
  }

  return (
    <div className="block">
      <button
        onClick={changeLanguage}
        value="en"
        className={
          i18n.language === "en"
            ? "text-accent inline-block mt-4 px-3 py-2 lg:mt-0 border-b-2 border-b-accent text-sm"
            : "inline-block mt-4 px-3 py-2 lg:mt-0 text-sm"
        }
      >
        EN
      </button>
      <button
        onClick={changeLanguage}
        value="cz"
        className={
          i18n.language === "cz"
            ? "text-accent inline-block mt-4 px-3 py-2 lg:mt-0 border-b-2 border-b-accent text-sm"
            : "inline-block mt-4 px-3 py-2 lg:mt-0 text-sm"
        }
      >
        CZ
      </button>
    </div>
  );
}
