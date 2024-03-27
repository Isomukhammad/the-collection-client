import { JSX } from "react";
import { Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";

import CollectionCard from "@/components/cards/CollectionCard";

import { ICollection } from "@/types.ts";

const BiggestCollectionsSection = (): JSX.Element => {
  const { t } = useTranslation();

  const {
    data: collections,
    isLoading: collectionsLoading,
    error: collectionsError,
  } = useQuery<{ data: ICollection[] }>("/collections?quantity=5&is_biggest=1");

  if (collectionsLoading)
    return (
      <div className={"d-flex mt-3 justify-content-center"}>
        <Spinner animation={"border"} role={"status"} />
      </div>
    );

  if (collectionsError) return <p className={"mt-3 text-danger"}>{t("Error while fetching data")}</p>;

  if (collections && !collections.data) return <p className={"mt-3 text-info"}>{t("Collections are empty")}</p>;

  return (
    <section className={"d-flex flex-column gap-3 mt-5"}>
      <h2>{t("Biggest collections")}</h2>
      <div className={"row"}>
        {collections &&
          collections.data.map((collection) => (
            <div key={collection.id} className={"col-lg-3 col-md-4 col-sm-6 mb-3"}>
              <CollectionCard
                id={collection.id}
                name={collection.name}
                description={collection.description}
                img={collection.img}
              />
            </div>
          ))}
      </div>
    </section>
  );
};

export default BiggestCollectionsSection;
