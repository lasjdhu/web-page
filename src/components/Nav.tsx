import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Nav({ onCloseMenu }: { onCloseMenu: () => void }) {
  const { t } = useTranslation();

  const handleNavLinkClick = () => {
    onCloseMenu();
  };

  return (
    <nav className="lg:flex-grow">
      <NavLink
        to="/"
        className="block my-8 lg:inline-block text-accent lg:my-0 lg:mx-12"
        onClick={handleNavLinkClick}
        style={({ isActive }) => ({
          color: isActive ? "" : "white",
          borderBottom: isActive ? "" : "2px",
        })}
      >
        {t("home")}
      </NavLink>
      <NavLink
        to="/about"
        className="block my-8 lg:inline-block text-accent lg:my-0 lg:mx-12"
        onClick={handleNavLinkClick}
        style={({ isActive }) => ({
          color: isActive ? "" : "white",
          borderBottom: isActive ? "" : "2px",
        })}
      >
        {t("about")}
      </NavLink>
      <NavLink
        to="/projects"
        className="block my-8 lg:inline-block text-accent lg:my-0 lg:mx-12"
        onClick={handleNavLinkClick}
        style={({ isActive }) => ({
          color: isActive ? "" : "white",
          borderBottom: isActive ? "" : "2px",
        })}
      >
        {t("projects")}
      </NavLink>
      <NavLink
        to="/contact"
        className="block my-8 lg:inline-block text-accent lg:my-0 lg:mx-12"
        onClick={handleNavLinkClick}
        style={({ isActive }) => ({
          color: isActive ? "" : "white",
          borderBottom: isActive ? "" : "2px",
        })}
      >
        {t("contact")}
      </NavLink>
    </nav>
  );
}
