import { JSX } from "react";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import UsersTable from "@/pages/AdminPage/UsersTable.tsx";

const AdminPage = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <main>
      <Container className={"my-5"}>
        <h1>{t("Admin panel")}</h1>
        <UsersTable />
      </Container>
    </main>
  );
};

export default AdminPage;
