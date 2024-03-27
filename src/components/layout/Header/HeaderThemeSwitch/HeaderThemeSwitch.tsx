import { JSX, useEffect } from "react";
import { Form } from "react-bootstrap";
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
    <Form>
      <Form.Check
        type="switch"
        id="custom-switch"
        checked={theme === "dark"}
        label={t("Dark Mode")}
        onChange={handleThemeChange}
      />
    </Form>
  );
};

export default HeaderThemeSwitch;
