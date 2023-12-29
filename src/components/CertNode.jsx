import { useTranslation } from "react-i18next";
import { FiExternalLink } from "react-icons/fi";

export default function CertNode(props) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        {props.img && (
          <img
            src={props.img}
            alt="logo"
            loading="lazy"
            className="w-20 h-auto mr-10"
          />
        )}
        <div>
          <h2 className="text-2xl text-white font-bold tracking-widest">
            {props.school}
          </h2>
          <p>{props.spec}</p>
          <p className="text-foreground font-thin">{props.yrs}</p>
          {props.href && (
            <div className="flex items-center">
              <a
                href={props.href}
                className="flex mr-2 justify-center align-center place-items-center text-accent"
                rel="noreferrer"
                target="_blank"
              >
                {t("verify")}
                <FiExternalLink className="ml-2" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
