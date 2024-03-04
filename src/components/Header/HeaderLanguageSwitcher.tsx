import { JSX } from "react";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const HeaderLanguageSwitcher = (): JSX.Element => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = async (language: string): Promise<void> => {
    localStorage.setItem("i18nextLng", language);
    await i18n.changeLanguage(language);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle
        variant={"outline-secondary"}
        id="dropdown-basic"
        className={"w-100"}
      >
        <span className={"text-uppercase"}>{i18n.language}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleLanguageChange("en")}>
          {t("English")}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleLanguageChange("ru")}>
          {t("Russian")}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default HeaderLanguageSwitcher;
