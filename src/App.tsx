import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import Loader from "@/components/Loader.tsx";

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
      <Routes>
        <Route
          path={ROUTES.HOME}
          element={
            <Loader>
              <MainPage />
            </Loader>
          }
        />
        <Route
          path={ROUTES.AUTH.LOGIN}
          element={
            <Loader>
              <LoginPage />
            </Loader>
          }
        />
        <Route
          path={ROUTES.AUTH.REGISTER}
          element={
            <Loader>
              <RegisterPage />
            </Loader>
          }
        />
      </Routes>
    </>
  );
}

export default App;
