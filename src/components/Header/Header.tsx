import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { JSX } from "react";

import HeaderLanguageSwitcher from "@/components/Header/HeaderLanguageSwitcher.tsx";

import HeaderThemeSwitch from "./HeaderThemeSwitch.tsx";

const Header = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <header>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={Link} to={"/"}>
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
              <Link to={"/login"} className={"d-block"}>
                <Button>{t("Login")}</Button>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
