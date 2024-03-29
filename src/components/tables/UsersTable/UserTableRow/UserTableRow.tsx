import classNames from "classnames";

import { JSX, useState } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import { useAuth } from "@/context/AuthContext.tsx";

import UserTableModal from "@/components/modals/EditUserModal";
import { UserTableRowProps } from "@/components/tables/UsersTable/UserTableRow";

import { baseAxios } from "@/utils/axios.ts";

const UserTableRow = ({ user, refetchUsers }: UserTableRowProps): JSX.Element => {
  const { checkUser } = useAuth();
  const { t } = useTranslation();
  const [isAction, setIsAction] = useState<boolean>(false);

  const handleAction = async (action: () => Promise<void>): Promise<void> => {
    try {
      setIsAction(true);
      await action();
    } catch (error) {
      console.error(error);
    } finally {
      setIsAction(false);
      refetchUsers();
    }
  };

  const handleBlock = async (): Promise<void> => {
    await handleAction(async () => {
      if (user.isBlocked) {
        await baseAxios.patch("/users/unblock", {
          ids: [user.id],
        });
      } else {
        await baseAxios.patch("/users/block", {
          ids: [user.id],
        });
        await checkUser();
      }
    });
  };

  const handleDelete = async (): Promise<void> => {
    await handleAction(async () => {
      await baseAxios.delete(`/users/delete`, {
        data: {
          ids: [user.id],
        },
      });
      await checkUser();
    });
  };

  return (
    <tr
      className={classNames("", {
        "table-danger": user.isBlocked,
      })}
    >
      <td className={"text-end"}>{user.id}</td>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>{user.isBlocked ? t("False") : t("True")}</td>
      <td className={"d-flex gap-2"}>
        <UserTableModal user={user} isAction={isAction} />
        <Button
          type={"button"}
          variant={user.isBlocked ? "success" : "warning"}
          disabled={isAction}
          onClick={handleBlock}
        >
          {user.isBlocked ? t("Unblock") : t("Block")}
        </Button>
        <Button type={"button"} variant={"danger"} disabled={isAction} onClick={handleDelete}>
          {t("Delete")}
        </Button>
      </td>
    </tr>
  );
};

export default UserTableRow;
