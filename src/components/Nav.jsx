import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Nav({ onCloseMenu }) {
  const { t } = useTranslation();

  const handleNavLinkClick = () => {
    onCloseMenu();
  };

  return (
    <nav className="lg:flex-grow">
      <NavLink
        to="/"
        className="block lg:inline-block text-accent lg:my-0 my-8 lg:mx-12"
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
        className="block lg:inline-block text-accent lg:my-0 my-8 lg:mx-12"
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
        className="block lg:inline-block text-accent lg:my-0 my-8 lg:mx-12"
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
        className="block lg:inline-block text-accent lg:my-0 my-8 lg:mx-12"
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
