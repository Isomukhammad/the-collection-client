import { JSX, useEffect } from "react";
import { Form } from "react-bootstrap";
import { BrightnessHigh, Moon } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";

import { useTheme } from "@/context/ThemeContext.tsx";

const HeaderThemeSwitch = (): JSX.Element => {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  const handleThemeChange = (): void => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Form className={"d-flex align-items-center gap-2"}>
      <Form.Check
        type="switch"
        id="custom-switch"
        checked={theme === "dark"}
        label={
          <div className={"d-flex align-items-center gap-2"}>
            <span className={"fw-semibold"}>{t("Dark Mode")}</span>
            {theme === "light" ? <BrightnessHigh /> : <Moon />}
          </div>
        }
        onChange={handleThemeChange}
      />
    </Form>
  );
};

export default HeaderThemeSwitch;
