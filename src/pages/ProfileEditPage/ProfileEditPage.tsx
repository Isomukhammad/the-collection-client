import { JSX } from "react";
import { Breadcrumb, Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import EditProfileForm from "@/components/forms/EditProfileForm";

import { ROUTES } from "@/config/routes.ts";

import EditPasswordForm from "../../components/forms/EditPasswordForm";

const ProfileEditPage = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Container className={"my-5"}>
      <Breadcrumb>
        <Breadcrumb.Item active>
          <Link to={ROUTES.AUTH.PROFILE.MAIN}>{t("Profile")}</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{t("Edit")}</Breadcrumb.Item>
      </Breadcrumb>
      <h1 className={"mb-3"}>{t("Edit user info")}</h1>
      <EditProfileForm />
      <EditPasswordForm />
    </Container>
  );
};

export default ProfileEditPage;
