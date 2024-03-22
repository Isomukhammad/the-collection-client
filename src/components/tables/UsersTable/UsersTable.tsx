import Table from "react-bootstrap/Table";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";

import Loader from "@/components/common/Loader";
import UserTableRow from "@/components/tables/UsersTable/UserTableRow/UserTableRow.tsx";

import { IUserAdmin } from "@/types.ts";

const UsersTable = (): JSX.Element => {
  const { t } = useTranslation();
  const {
    data: users = [],
    isLoading: usersLoading,
    isError: usersError,
    refetch: refetchUsers,
  } = useQuery<IUserAdmin[]>("/users", {
    staleTime: 0,
  });

  if (usersLoading) return <Loader />;
  if (usersError) return <p>{t("Error loading users")}</p>;

  return (
    <Table striped bordered hover responsive className={"mt-5"}>
      <thead>
        <tr>
          <th>ID</th>
          <th>{t("Name")}</th>
          <th>{t("Email")}</th>
          <th>{t("Role")}</th>
          <th>{t("Active")}</th>
          <th>{t("Actions")}</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          return <UserTableRow key={user.id} user={user} refetchUsers={refetchUsers} />;
        })}
      </tbody>
    </Table>
  );
};

export default UsersTable;
