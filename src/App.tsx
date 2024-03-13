import { Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";

import Loader from "@/components/Loader.tsx";

import { ROLES } from "@/config/roles.ts";
import { ROUTES } from "@/config/routes.ts";

import "./App.css";
import { Header } from "./components/Header";
import { useAuth } from "./context/AuthContext";

const AddCollectionPage = lazy(() => import("@/pages/AddCollectionPage.tsx"));
const AdminPage = lazy(() => import("@/pages/AdminPage/AdminPage.tsx"));
const ErrorPage = lazy(() => import("@/pages/ErrorPage.tsx"));
const LoginPage = lazy(() => import("@/pages/LoginPage.tsx"));
const MainPage = lazy(() => import("@/pages/MainPage.tsx"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage/ProfilePage.tsx"));
const RegisterPage = lazy(() => import("@/pages/RegisterPage.tsx"));
const UserCollectionsPage = lazy(
  () => import("@/pages/UserCollectionsPage.tsx"),
);

function App() {
  const { user, userLoading } = useAuth();
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
          <Route
            path={ROUTES.AUTH.LOGIN}
            element={
              user ? <Navigate to={ROUTES.AUTH.PROFILE.MAIN} /> : <LoginPage />
            }
          />
          <Route
            path={ROUTES.AUTH.REGISTER}
            element={
              user ? (
                <Navigate to={ROUTES.AUTH.PROFILE.MAIN} />
              ) : (
                <RegisterPage />
              )
            }
          />
          <Route
            path={ROUTES.AUTH.PROFILE.MAIN}
            element={
              user ? <ProfilePage /> : <Navigate to={ROUTES.AUTH.LOGIN} />
            }
          />
          <Route
            path={ROUTES.AUTH.ADMIN}
            element={
              user && user.role === ROLES.ADMIN ? (
                <AdminPage />
              ) : (
                <Navigate to={ROUTES.AUTH.LOGIN} />
              )
            }
          />
          <Route
            path={ROUTES.COLLECTIONS.USERCOLLECTIONS}
            element={
              user ? (
                <UserCollectionsPage />
              ) : (
                <Navigate to={ROUTES.AUTH.LOGIN} />
              )
            }
          />
          <Route
            path={ROUTES.COLLECTIONS.ADDCOLLECTION}
            element={
              user ? <AddCollectionPage /> : <Navigate to={ROUTES.AUTH.LOGIN} />
            }
          />
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
