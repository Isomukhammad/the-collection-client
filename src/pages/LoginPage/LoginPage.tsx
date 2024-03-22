import { JSX } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import LoginForm from "@/components/forms/LoginForm";

const LoginPage = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <main>
      <Container>
        <Row className="justify-content-md-center align-items-center min-vh-100">
          <Col lg="5" className="p-3 rounded">
            <h1 className={"text-center mb-3"}>{t("Login")}</h1>
            <LoginForm />
            <p className={"text-center mt-3 fw-medium"}>
              {t("Don't have an account?")} <Link to={"/register"}>{t("Register")}</Link>
            </p>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default LoginPage;
