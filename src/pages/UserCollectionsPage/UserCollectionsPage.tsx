import { AxiosError } from "axios";

import { JSX } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import CollectionCard from "@/components/cards/CollectionCard";

import { ICollection } from "@/types.ts";

const UserCollectionsPage = (): JSX.Element => {
  const { id } = useParams();

  const { t } = useTranslation();

  const {
    data: collections,
    isLoading: collectionsLoading,
    error: collectionsError,
  } = useQuery<
    {
      author: {
        id: number;
        username: string;
      };
      data: ICollection[];
    },
    AxiosError<{ message: string }>
  >(`/collections?authorId=${id}`);

  if (collectionsLoading)
    return (
      <Container as={"main"} className={"d-flex mt-5 justify-content-center"}>
        <Spinner animation={"border"} role={"status"} />
      </Container>
    );

  if (collectionsError)
    return (
      <Container as={"main"} className={"mt-5"}>
        <p className={"mt-3 text-danger fw-semibold"}>
          {collectionsError?.response?.data?.message
            ? collectionsError.response.data.message
            : t("Error while fetching data")}
        </p>
      </Container>
    );

  if (collections && !collections.data) return <p className={"mt-3 text-info"}>{t("Collections are empty")}</p>;

  return (
    <Container as={"main"} className={"my-5"}>
      <h1>{t("UserCollections", { name: collections?.author.username })}</h1>
      <div className={"row mt-3"}>
        {collections?.data.length ? (
          collections.data.map((collection) => {
            return (
              <div key={collection.id} className={"col-lg-3 col-md-4 col-sm-6 mb-3"}>
                <CollectionCard
                  id={collection.id}
                  name={collection.name}
                  img={collection.img}
                  description={collection.description}
                />
              </div>
            );
          })
        ) : (
          <p className={"text-info fw-semibold"}>{t("Collections are empty")}</p>
        )}
      </div>
    </Container>
  );
};

export default UserCollectionsPage;
