import { JSX } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const ErrorPage = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <main>
      <Container>
        <Row className="justify-content-md-center align-items-center min-vh-100">
          <Col lg="5" className="p-3 rounded text-center">
            <h1 className={"mb-3 fw-bold display-1"}>404</h1>
            <p className={"lead"}>{t("Page Not Found")}</p>
            <Link to={"/"} className={"btn btn-primary"}>
              {t("Go Home")}
            </Link>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ErrorPage;
