import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiExternalLink } from "react-icons/fi";

export default function Box(props) {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article className="flex flex-col bg-white rounded-md bg-opacity-5 p-7 lg:p-10">
      <div
        className="lg:mb-8"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <a href={props.to}>
          <img
            alt={props.title}
            src={props.img}
            className={`transition-opacity duration-300 ${
              isHovered && window.innerWidth > 1024 && !props.inProgress
                ? "opacity-100"
                : "opacity-50"
            } ${props.inProgress ? "blur-sm" : ""}`}
          />
        </a>
      </div>
      <div className="flex flex-col mt-4 lg:mt-0">
        <h2 className="mb-4 text-2xl font-bold">{props.title}</h2>
        <p className="mb-2 font-thin text-foreground">{props.yrs}</p>
        <p className="mb-4 text-foreground">{props.desc}</p>
        <div className="flex flex-row items-center">
          <div className="flex items-center">
            {props.href && (
              <a
                href={props.href}
                className="flex justify-center mr-5 align-center place-items-center text-accent"
                rel="noreferrer"
                target="_blank"
              >
                {t("source")}
                <FiExternalLink className="ml-2" />
              </a>
            )}
            {props.to ? (
              <a href={props.to}>
                <button className="flex items-center justify-center h-10 px-6 text-sm transition duration-300 ease-in-out bg-transparent border rounded-sm cursor-pointer hover:bg-accent text-accent hover:text-background border-accent hover:-translate-y-1">
                  {t("run")}
                </button>
              </a>
            ) : (
              <span className="h-10" />
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
