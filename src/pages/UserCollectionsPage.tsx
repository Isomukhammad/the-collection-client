import { JSX } from "react";
import { Card, Container, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

import { useAuth } from "@/context/AuthContext.tsx";

import { ROUTES } from "@/config/routes.ts";
import { ICollection } from "@/types.ts";

const UserCollectionsPage = (): JSX.Element => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const {
    data: collections,
    isLoading: collectionsLoading,
    isError: collectionsError,
  } = useQuery<{ data: ICollection[] }>(`/collections?authorId=${user?.id}`);

  if (collectionsLoading)
    return (
      <div className={"d-flex mt-3 justify-content-center"}>
        <Spinner animation={"border"} role={"status"} />
      </div>
    );

  if (collectionsError)
    return (
      <p className={"mt-3 text-danger"}>{t("Error while fetching data")}</p>
    );

  if (collections && !collections.data)
    return <p className={"mt-3 text-info"}>{t("Collections are empty")}</p>;

  return (
    <Container as={"main"} className={"my-5"}>
      <h1>{t("UserCollections", { name: user?.username })}</h1>
      <div className={"row mt-3"}>
        {collections!.data.map((collection) => {
          return (
            <div
              key={collection.id}
              className={"col-lg-3 col-md-4 col-sm-6 mb-3"}
            >
              <Card>
                <Card.Img
                  src={collection.image || "/images/placeholder.webp"}
                  alt={collection.name}
                  className={"card-img-top"}
                />
                <Card.Body>
                  <Card.Title>{collection.name}</Card.Title>
                  <Card.Text className={"text-truncate"}>
                    {collection.description}
                  </Card.Text>
                </Card.Body>
                <Link
                  to={ROUTES.COLLECTIONS.COLLECTION.replace(
                    ":id",
                    collection.id.toString(),
                  )}
                  className={"btn btn-primary"}
                >
                  {t("View collection")}
                </Link>
              </Card>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default UserCollectionsPage;
