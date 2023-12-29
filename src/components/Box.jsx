import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiExternalLink } from "react-icons/fi";

import Badge from "./Badge";

export default function Box(props) {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);

  const isDesktop = window.innerWidth >= 1024;
  const shouldDisplayImage = props.isEnabled || !isDesktop;

  return (
    <article className="flex lg:flex-row flex-col mx-auto w-3/4 relative justify-center items-center">
      <div
        className="group relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {shouldDisplayImage && (
          <NavLink to={props.to}>
            <img
              alt={props.title}
              src={props.img}
              className={`w-96 h-48 object-cover transition-opacity duration-300 ${
                isHovered && "opacity-10"
              }`}
            />
            {isHovered && (
              <div className="absolute inset-0 flex items-center justify-center border border-accent text-accent">
                <p className="text-bold text-xl">{t("run")}</p>
              </div>
            )}
          </NavLink>
        )}
        {!props.isEnabled && isDesktop && (
          <>
            <img
              alt={props.title}
              src={props.img}
              className="w-96 h-48 object-cover opacity-10"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Badge name="soon" />
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col mt-4 lg:mt-0 lg:ml-8">
        <h2 className="text-2xl font-bold mb-4">{props.title}</h2>
        <p className="text-foreground font-thin">{props.yrs}</p>
        <p className="text-foreground mb-4">{props.desc}</p>
        <div className="flex flex-row items-center">
          <div className="flex items-center">
            <a
              href={props.href}
              className="flex mr-2 justify-center align-center place-items-center text-accent"
              rel="noreferrer"
              target="_blank"
            >
              {t("source")}
              <FiExternalLink className="ml-2" />
            </a>
            {props.isEnabled && (
              <NavLink to={props.to}>
                {props.isEnabled ? (
                  <button
                    className="text-sm flex h-10 justify-center items-center mx-5 px-3
                    bg-transparent hover:bg-accent text-accent hover:text-background border-accent
                    border cursor-pointer transition ease-in-out hover:-translate-y-1 duration-300"
                  >
                    <NavLink to={props.to} className="cursor-pointer">
                      {t("run")}
                    </NavLink>
                  </button>
                ) : (
                  <Badge name="soon" />
                )}
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
