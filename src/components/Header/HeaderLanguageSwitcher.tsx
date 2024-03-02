import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import { JSX } from "react";

const HeaderLanguageSwitcher = (): JSX.Element => {
  const { i18n } = useTranslation();

  const handleLanguageChange = async (language: string): Promise<void> => {
    localStorage.setItem("i18nextLng", language);
    await i18n.changeLanguage(language);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant={"secondary"} id="dropdown-basic">
        <span className={"text-uppercase"}>{i18n.language}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleLanguageChange("en")}>
          EN
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleLanguageChange("ru")}>
          RU
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default HeaderLanguageSwitcher;
