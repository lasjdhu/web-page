import { FaHammer } from "react-icons/fa";
import { useTranslation } from "react-i18next";

function Badge(props) {
  const { t } = useTranslation();

  return (
    <div className="flex p-3 animate-pulse justify-center">
      <FaHammer size="1.2em" />
      <p className="text-l pl-2">{t(`${props.name}`)}</p>
    </div>
  );
}

export default Badge;
