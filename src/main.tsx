import "bootstrap/dist/css/bootstrap.min.css";

import { StrictMode } from "react";
import { Container } from "react-bootstrap";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { ErrorBoundary } from "./components/ErrorBoundary";
import "./i18n.ts";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary
      renderFallback={(error) => (
        <Container>
          <p className={"text-danger fw-semibold"}>{error.message}</p>
        </Container>
      )}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);
