import { JSX } from "react";
import { Container, Spinner } from "react-bootstrap";

const Loader = (): JSX.Element => {
  return (
    <Container
      className={"min-vh-100 d-flex justify-content-center align-items-center"}
    >
      <Spinner animation={"border"} role={"status"} />
    </Container>
  );
};

export default Loader;
