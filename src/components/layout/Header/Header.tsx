import classNames from "classnames";

import { JSX } from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { BoxArrowRight, CollectionFill, Person, PersonFill } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { Link, Outlet } from "react-router-dom";

import { useAuth } from "@/context/AuthContext.tsx";

import { ROLES } from "@/config/roles.ts";
import { ROUTES } from "@/config/routes";

import HeaderLanguageSwitcher from "./HeaderLanguageSwitcher";
import HeaderThemeSwitch from "./HeaderThemeSwitch";

const Header = (): JSX.Element => {
  const { t } = useTranslation();
  const { user, setBearerToken } = useAuth();

  return (
    <>
      <header>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand as={Link} to={"/"} className={"fw-bold d-flex align-items-center gap-2"}>
              <CollectionFill />
              <span>TheCollection</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav justify-end d-flex gap-4">
              <span className="me-auto">
                {/*<Form className={"py-3 py-lg-0"}>*/}
                {/*  <Form.Group>*/}
                {/*    <Form.Control type="text" placeholder={t("Search")} />*/}
                {/*  </Form.Group>*/}
                {/*</Form>*/}
              </span>
              <Nav className={"d-flex gap-3 align-items-lg-center"}>
                <HeaderThemeSwitch />
                <HeaderLanguageSwitcher />
                <Link
                  to={user ? ROUTES.AUTH.PROFILE.MAIN : ROUTES.AUTH.LOGIN}
                  className={classNames("btn btn-primary d-flex align-items-center gap-1 justify-content-center")}
                >
                  {user ? <PersonFill /> : <Person />}
                  <span>{user ? t("Go to profile") : t("Login")}</span>
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
                    className={"d-flex align-items-center gap-1 justify-content-center"}
                  >
                    <BoxArrowRight />
                    <span>{t("Logout")}</span>
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
