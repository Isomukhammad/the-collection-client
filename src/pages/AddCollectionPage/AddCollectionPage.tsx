import { JSX } from "react";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import AddCollectionForm from "@/components/forms/AddCollectionForm";

const AddCollectionPage = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Container as={"main"} className={"my-5"}>
      <h1>{t("Add Collection")}</h1>
      <AddCollectionForm />
    </Container>
  );
};

export default AddCollectionPage;
