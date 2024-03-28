import { JSX } from "react";
import { Button, Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";

import { useAuth } from "@/context/AuthContext.tsx";

import Loader from "@/components/common/Loader";

import { ROUTES } from "@/config/routes.ts";
import { IItem } from "@/types.ts";

const SingleItemPage = (): JSX.Element => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { user } = useAuth();

  const { data: item, isLoading: itemLoading, isError: itemError } = useQuery<{ data: IItem }>(`/items/${id}`);

  if (itemLoading)
    return (
      <main>
        <Loader />
      </main>
    );

  if (itemError)
    return (
      <Container as="main" className="my-5">
        <p className={"mt-3 text-danger"}>{t("Error while fetching data")}</p>
      </Container>
    );

  if (item && !item.data)
    return (
      <Container as="main" className="my-5">
        <p className={"mt-3 text-info"}>{t("Not found")}</p>
      </Container>
    );

  return (
    <Container as={"main"} className="my-5">
      <div className={"d-flex justify-content-between align-items-center"}>
        <h1>{item?.data.name}</h1>
        {(item?.data.authorId === user?.id || user?.role === "ADMIN") && (
          <div className={"d-flex gap-2"}>
            <Button variant={"danger"} type={"button"} title={t("Delete")}>
              {t("Delete")}
            </Button>
            <Link
              to={ROUTES.ITEMS.EDITITEM.replace(":id", String(id))}
              title={t("Add item")}
              className={"btn btn-info"}
            >
              {t("Edit")}
            </Link>
          </div>
        )}
      </div>
    </Container>
  );
};

export default SingleItemPage;
