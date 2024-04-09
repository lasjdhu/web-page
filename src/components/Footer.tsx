import { SocialIcon } from "react-social-icons";

const currentYear = () => {
  return new Date().getFullYear();
};

export default function Footer() {
  return (
    <footer className="flex flex-row items-center justify-center py-5 text-center align-center">
      <p className="text-sm text-gray-500">
        © {currentYear()} Dmitrii Ivanushkin
      </p>
      <ul className="flex flex-row justify-center">
        <li className="pl-5">
          <SocialIcon
            url="https://linkedin.com/in/dmitrii-ivanushkin"
            fgColor="currentColor"
            bgColor="transparent"
            className="hover:text-[#F4E664] hover:scale-110"
            style={{ height: 35, width: 35 }}
            rel="noreferrer"
            target="_blank"
          />
        </li>
        <li className="pl-3">
          <SocialIcon
            url="https://github.com/lasjdhu"
            fgColor="currentColor"
            bgColor="transparent"
            className="hover:text-[#F4E664] hover:scale-110"
            style={{ height: 35, width: 35 }}
            rel="noreferrer"
            target="_blank"
          />
        </li>
      </ul>
    </footer>
  );
}
