import { JSX } from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link, Outlet } from "react-router-dom";

import { useAuth } from "@/context/AuthContext.tsx";

import HeaderLanguageSwitcher from "@/components/Header/HeaderLanguageSwitcher.tsx";

import { ROLES } from "@/config/roles.ts";

import HeaderThemeSwitch from "./HeaderThemeSwitch.tsx";

const Header = (): JSX.Element => {
  const { t } = useTranslation();
  const { user, setBearerToken } = useAuth();

  return (
    <>
      <header>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand as={Link} to={"/"} className={"fw-bold"}>
              TheCollection
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav justify-between d-flex gap-4">
              <Nav className="me-auto">
                <Form className={"py-3 py-lg-0"}>
                  <Form.Group>
                    <Form.Control type="text" placeholder={t("Search")} />
                  </Form.Group>
                </Form>
              </Nav>
              <Nav className={"d-flex gap-3 align-items-lg-center"}>
                <HeaderThemeSwitch />
                <HeaderLanguageSwitcher />
                <Link
                  to={user ? "/profile" : "/login"}
                  className={"btn btn-primary"}
                >
                  {user ? t("Go to profile") : t("Login")}
                </Link>
                {user && user.role === ROLES.ADMIN && (
                  <Link to={"/admin"} className={"btn btn-success"}>
                    {t("Admin panel")}
                  </Link>
                )}
                {user && (
                  <Button
                    variant="outline-danger"
                    onClick={() => setBearerToken("")}
                  >
                    {t("Logout")}
                  </Button>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <Outlet />
    </>
  );
};

export default Header;
