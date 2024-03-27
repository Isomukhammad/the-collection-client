import { JSX } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import { useAuth } from "@/context/AuthContext";

import AddItemForm from "@/components/forms/AddItemForm";

import { ICollection } from "@/types";

const AddItemPage = (): JSX.Element => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { user } = useAuth();

  const {
    data: collection,
    isLoading: collectionLoading,
    isError: collectionError,
  } = useQuery<{ data: ICollection }>(`/collections/${id}`);

  if (collectionLoading)
    return (
      <Container as={"main"} className={"d-flex mt-3 justify-content-center"}>
        <Spinner animation={"border"} role={"status"} />
      </Container>
    );
  if (collectionError)
    return (
      <Container as="main">
        <p className={"mt-3 text-danger"}>{t("Error while fetching data")}</p>
      </Container>
    );
  if (collection && !collection.data)
    return (
      <Container as="main">
        <p className={"mt-3 text-info"}>{t("Not found")}</p>
      </Container>
    );
  if (collection?.data.authorId !== user?.id)
    return (
      <Container as="main">
        <p className={"mt-3 text-danger"}>{t("Access denied")}</p>
      </Container>
    );

  return (
    <Container as={"main"} className={"my-5"}>
      <h1>{t("Add item")}</h1>
      <AddItemForm />
    </Container>
  );
};

export default AddItemPage;
