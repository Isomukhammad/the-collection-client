import { JSX } from "react";
import { Container, Image } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import Loader from "@/components/common/Loader";

import { ICollection } from "@/types.ts";

const SingleCollectionPage = (): JSX.Element => {
  const { id } = useParams();
  const { t } = useTranslation();
  const {
    data: collection,
    isLoading: collectionLoading,
    isError: collectionError,
  } = useQuery<{ data: ICollection }>(`/collections/${id}`);

  if (collectionLoading)
    return (
      <main>
        <Loader />
      </main>
    );

  if (collectionError)
    return (
      <Container as="main" className="my-5">
        <p className={"mt-3 text-danger"}>{t("Error while fetching data")}</p>
      </Container>
    );

  if (collection && !collection.data)
    return (
      <Container as="main" className="my-5">
        <p className={"mt-3 text-info"}>{t("Not found")}</p>
      </Container>
    );

  const { createdAt } = collection!.data;
  const date = new Date(createdAt);

  return (
    <Container as={"main"} className="my-5">
      <div>
        <h1>{collection?.data.name}</h1>
        <p className="text-secondary">
          {t("Created at")} {date.toLocaleDateString()} {date.toLocaleTimeString()}
        </p>
      </div>

      <div className="d-flex flex-column flex-md-row">
        <div className="col-12 col-md-2 me-5">
          <Image src={collection?.data.img || "/images/placeholder.webp"} alt={collection?.data.name} rounded fluid />
        </div>
        <div className="col-12 col-md-10">
          <p>
            <span>ID: </span>
            <span>{collection?.data.id}</span>
          </p>
          <p>
            <span>{t("Topic")}: </span>
            <span>{collection?.data.topic}</span>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default SingleCollectionPage;
