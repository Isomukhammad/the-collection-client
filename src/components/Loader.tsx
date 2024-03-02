import { JSX, ReactNode, Suspense } from "react";
import { Container, Spinner } from "react-bootstrap";

const Loader = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <Suspense
      fallback={
        <main>
          <Container
            className={
              "min-vh-100 d-flex justify-content-center align-items-center"
            }
          >
            <Spinner animation={"border"} role={"status"} />
          </Container>
        </main>
      }
    >
      {children}
    </Suspense>
  );
};

export default Loader;
