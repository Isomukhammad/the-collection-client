import { JSX } from "react";
import { Container, ListGroup, ListGroupItem } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { useAuth } from "@/context/AuthContext.tsx";

import Loader from "@/components/common/Loader";
import CollectionsTable from "@/components/tables/CollectionsTable";

import { ROUTES } from "@/config/routes.ts";

const ProfilePage = (): JSX.Element => {
  const { t } = useTranslation();
  const { user, userLoading } = useAuth();

  if (userLoading) return <Loader />;

  return (
    <Container className={"my-5"}>
      <div className="d-flex justify-content-between align-items-center">
        <h1>{t("Profile")}</h1>
        <Link to={ROUTES.AUTH.PROFILE.EDIT} className="btn btn-info fw-semibold">
          {t("Edit user profile")}
        </Link>
      </div>
      <ListGroup className={"mt-3"}>
        <ListGroupItem>
          <span className={"fw-semibold"}>{t("Name")}:</span> <span>{user?.username}</span>
        </ListGroupItem>
        <ListGroupItem>
          <span className={"fw-semibold"}>{t("Email")}:</span> <span>{user?.email}</span>
        </ListGroupItem>
      </ListGroup>
      <div className={"mt-3 d-flex flex-column"}>
        <div className={"d-flex justify-content-between align-items-center"}>
          <h2>{t("Collections")}</h2>
          <div className={"d-flex align-items-center gap-1"}>
            <Link to={ROUTES.COLLECTIONS.USERCOLLECTIONS} className={"btn btn-outline-success"}>
              {t("View all")}
            </Link>
            <Link to={ROUTES.COLLECTIONS.ADDCOLLECTION} className="btn btn-primary">
              {t("Add new")}
            </Link>
          </div>
        </div>
        <CollectionsTable />
      </div>
    </Container>
  );
};

export default ProfilePage;
