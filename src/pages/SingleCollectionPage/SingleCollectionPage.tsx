import { JSX } from "react";
import { Container, Image } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";

import Loader from "@/components/common/Loader";

import { ROUTES } from "@/config/routes";
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
        <div className={"d-flex justify-content-between align-items-center"}>
          <h1>{collection?.data.name}</h1>
          <Link to={ROUTES.ITEMS.ADDITEM.replace(":id", String(id))} title={t("Add item")} className={"btn btn-info"}>
            {t("Add item")}
          </Link>
        </div>
        <p className="text-secondary">
          {t("Created at")} {date.toLocaleDateString()} {date.toLocaleTimeString()}
        </p>
      </div>

      <div className={"d-flex flex-column flex-md-row mt-5"}>
        <div className={"col-12 col-md-2 me-5"}>
          <Image src={collection?.data.img || "/images/placeholder.webp"} alt={collection?.data.name} rounded fluid />
        </div>
        <div className={"col-12 col-md-10"}>
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

      <article className={"my-5"}>
        <h2>{t("Description of collection")}:</h2>
        <ReactMarkdown className={"mt-3"}>{collection?.data.description}</ReactMarkdown>
      </article>
    </Container>
  );
};

export default SingleCollectionPage;
