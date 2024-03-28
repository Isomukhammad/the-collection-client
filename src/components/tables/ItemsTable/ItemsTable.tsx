import { JSX } from "react";
import { Spinner } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

import { ItemsTableProps } from "@/components/tables/ItemsTable";

import { ROUTES } from "@/config/routes.ts";
import { IItem } from "@/types.ts";

const ItemsTable = ({ link, title }: ItemsTableProps): JSX.Element => {
  const { t } = useTranslation();
  const { data: items, isLoading: itemsLoading, error: itemsError } = useQuery<{ data: IItem[] }>(`${link}`);

  if (itemsLoading) {
    return (
      <div className={"d-flex mt-3 justify-content-center"}>
        <Spinner animation={"border"} role={"status"} />
      </div>
    );
  }

  if (itemsError) {
    return <p className={"mt-3 text-danger"}>{t("Error while fetching data")}</p>;
  }

  if (items && !items.data) {
    return <p className={"mt-3 text-info"}>{t("Data is empty")}</p>;
  }

  return (
    <section className={"d-flex flex-column mt-5"}>
      <h2>{title}</h2>
      <Table striped bordered hover responsive className={"mt-3"}>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">{t("Name")}</th>
            <th scope="col">{t("Collection")}</th>
            <th scope="col">{t("Author")}</th>
            <th scope="col">{t("Created at")}</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {items!.data.map((item, index: number) => {
            return (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item?.collection && item?.collection.name}</td>
                <td>{item?.author && item?.author.username}</td>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                <td>
                  <Link to={ROUTES.ITEMS.ITEM.replace(":id", String(item.id))} className={"btn btn-primary"}>
                    {t("View")}
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </section>
  );
};

export default ItemsTable;
