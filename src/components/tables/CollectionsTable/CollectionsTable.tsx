import { JSX } from "react";
import { Spinner } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

import { useAuth } from "@/context/AuthContext.tsx";

import { ROUTES } from "@/config/routes.ts";
import { ICollection } from "@/types.ts";

const CollectionsTable = (): JSX.Element => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const {
    data: collections,
    isLoading: collectionsLoading,
    isError: collectionsError,
  } = useQuery<{ data: ICollection[] }>(`/collections?author_id=${user?.id}&quantity=5`);

  if (collectionsLoading)
    return (
      <div className={"d-flex mt-3 justify-content-center"}>
        <Spinner animation={"border"} role={"status"} />
      </div>
    );

  if (collectionsError) return <p className={"mt-3 text-danger"}>{t("Error while fetching data")}</p>;

  if (collections && !collections.data) return <p className={"mt-3 text-info"}>{t("Collections are empty")}</p>;

  return (
    <Table striped bordered hover responsive className={"mt-3"}>
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">{t("Name")}</th>
          <th scope="col">{t("Topic")}</th>
          <th scope="col">{t("Description")}</th>
          <th scope="col">{t("Created at")}</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {collections!.data.map((collection, index: number) => {
          return (
            <tr key={collection.id}>
              <th scope="row">{index + 1}</th>
              <td>{collection.name}</td>
              <td>{collection.topic}</td>
              <td>{collection.description}</td>
              <td>{new Date(collection.createdAt).toLocaleDateString()}</td>
              <td>
                <Link
                  to={ROUTES.COLLECTIONS.COLLECTION.replace(":id", String(collection.id))}
                  className={"btn btn-primary"}
                >
                  {t("View")}
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default CollectionsTable;
