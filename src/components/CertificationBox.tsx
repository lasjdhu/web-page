import { useTranslation } from "react-i18next";
import { FiExternalLink } from "react-icons/fi";

export default function CertificationBox({
  img,
  school,
  spec,
  yrs,
  href,
}: {
  img: string;
  school: string;
  spec: string;
  yrs: string;
  href?: string;
}) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        {img && (
          <img
            src={img}
            alt="logo"
            loading="lazy"
            className="w-20 h-auto mr-10"
          />
        )}
        <div>
          <h2 className="text-2xl font-bold tracking-widest text-white">
            {school}
          </h2>
          <p>{spec}</p>
          <p className="font-thin text-foreground">{yrs}</p>
          {href && (
            <div className="flex items-center">
              <a
                href={href}
                className="flex justify-center mr-2 align-center place-items-center text-accent"
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
