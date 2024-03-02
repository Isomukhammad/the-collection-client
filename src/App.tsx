import { Container, Spinner } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";

import { Suspense, lazy } from "react";

import { ROUTES } from "@/config/routes.ts";

import "./App.css";
import { Header } from "./components/Header";

const LoginPage = lazy(() => import("@/pages/LoginPage/LoginPage.tsx"));
const MainPage = lazy(() => import("@/pages/MainPage/MainPage.tsx"));
const RegisterPage = lazy(
  () => import("@/pages/RegisterPage/RegisterPage.tsx"),
);

function App() {
  return (
    <>
      <Header />
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
        <Routes>
          <Route path={ROUTES.HOME} element={<MainPage />} />
          <Route path={ROUTES.AUTH.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.AUTH.REGISTER} element={<RegisterPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
