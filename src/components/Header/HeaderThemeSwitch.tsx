import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import { JSX, useEffect, useState } from "react";

type Theme = "light" | "dark";

const HeaderThemeSwitch = (): JSX.Element => {
  const { t } = useTranslation();
  const [theme, setTheme] = useState<Theme>(
    (localStorage.getItem("theme") as Theme) || "light",
  );

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
