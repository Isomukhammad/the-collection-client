import { Suspense, lazy, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Navigate, Route, Routes } from "react-router-dom";

import Loader from "@/components/common/Loader";
import Header from "@/components/layout/Header";

import { ROLES } from "@/config/roles.ts";
import { ROUTES } from "@/config/routes.ts";

import "./App.css";
import { useAuth } from "./context/AuthContext";
import AddItemPage from "./pages/AddItemPage";
import { baseAxios } from "./utils/axios";

const AddCollectionPage = lazy(() => import("@/pages/AddCollectionPage"));
const AdminPage = lazy(() => import("@/pages/AdminPage"));
const ErrorPage = lazy(() => import("@/pages/ErrorPage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const MainPage = lazy(() => import("@/pages/MainPage"));
const ProfileEditPage = lazy(() => import("@/pages/ProfileEditPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const RegisterPage = lazy(() => import("@/pages/RegisterPage"));
const SingleCollectionPage = lazy(() => import("@/pages/SingleCollectionPage"));
const UserCollectionsPage = lazy(() => import("@/pages/UserCollectionsPage"));

function App() {
  const {
    i18n: { language },
  } = useTranslation();
  const { user, userLoading } = useAuth();

  useEffect(() => {
    baseAxios.defaults.headers["Accept-Language"] = language;
  }, [language]);

  if (userLoading)
    return (
      <main>
        <Loader />
      </main>
    );

  return (
    <>
      <Header />
      <Suspense
        fallback={
          <main>
            <Loader />
          </main>
        }
      >
        <Routes>
          <Route path={ROUTES.HOME} element={<MainPage />} />
          <Route path={ROUTES.AUTH.LOGIN} element={user ? <Navigate to={ROUTES.AUTH.PROFILE.MAIN} /> : <LoginPage />} />
          <Route
            path={ROUTES.AUTH.REGISTER}
            element={user ? <Navigate to={ROUTES.AUTH.PROFILE.MAIN} /> : <RegisterPage />}
          />
          <Route
            path={ROUTES.AUTH.PROFILE.MAIN}
            element={user ? <ProfilePage /> : <Navigate to={ROUTES.AUTH.LOGIN} />}
          />
          <Route
            path={ROUTES.AUTH.PROFILE.EDIT}
            element={user ? <ProfileEditPage /> : <Navigate to={ROUTES.AUTH.LOGIN} />}
          />
          <Route
            path={ROUTES.AUTH.ADMIN}
            element={user && user.role === ROLES.ADMIN ? <AdminPage /> : <Navigate to={ROUTES.AUTH.LOGIN} />}
          />
          <Route path={ROUTES.COLLECTIONS.USERCOLLECTIONS} element={<UserCollectionsPage />} />
          <Route path={ROUTES.COLLECTIONS.COLLECTION} element={<SingleCollectionPage />} />
          <Route
            path={ROUTES.COLLECTIONS.ADDCOLLECTION}
            element={user ? <AddCollectionPage /> : <Navigate to={ROUTES.AUTH.LOGIN} />}
          />
          <Route path={ROUTES.ITEMS.ADDITEM} element={user ? <AddItemPage /> : <Navigate to={ROUTES.AUTH.LOGIN} />} />
          <Route path={"*"} element={<ErrorPage />} />
        </Routes>
      </Suspense>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />
    </>
  );
}

export default App;
