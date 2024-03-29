import { JSX } from "react";
import { Button, Container, Image } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import { useQuery } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useAuth } from "@/context/AuthContext.tsx";

import Loader from "@/components/common/Loader";
import EditCollectionModal from "@/components/modals/EditCollectionModal";
import ItemsTable from "@/components/tables/ItemsTable";

import { ROUTES } from "@/config/routes";
import { ICollection } from "@/types.ts";
import { baseAxios } from "@/utils/axios.ts";

const SingleCollectionPage = (): JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useTranslation();
  const {
    data: collection,
    isLoading: collectionLoading,
    isError: collectionError,
    refetch: refetchCollection,
  } = useQuery<{ data: ICollection }>(`/collections/${id}`);
  const { user } = useAuth();

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

  const handleDeleteCollection = async (): Promise<void> => {
    try {
      await baseAxios.delete(`/collections/${id}`);
      navigate(ROUTES.AUTH.PROFILE.MAIN);
    } catch (e) {
      console.log(e);
    }
  };

  if (collection)
    return (
      <Container as={"main"} className="my-5">
        <div>
          <div className={"d-flex justify-content-between align-items-center"}>
            <h1>{collection?.data.name}</h1>
            {(collection?.data.authorId === user?.id || user?.role === "ADMIN") && (
              <div className={"d-flex gap-2"}>
                <EditCollectionModal
                  id={collection.data.id}
                  name={collection.data.name}
                  topic={collection.data.topic}
                  description={collection.data.description}
                  refetch={refetchCollection}
                />
                <Button variant={"danger"} type={"button"} title={t("Delete")} onClick={handleDeleteCollection}>
                  {t("Delete")}
                </Button>
                <Link
                  to={ROUTES.ITEMS.ADDITEM.replace(":id", String(id))}
                  title={t("Add item")}
                  className={"btn btn-info"}
                >
                  {t("Add item")}
                </Link>
              </div>
            )}
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
        <ItemsTable title={t("Items")} link={`/items?collection_id=${id}`} />
      </Container>
    );

  return <></>;
};

export default SingleCollectionPage;
