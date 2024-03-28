import { JSX } from "react";
import { Button, Container, ListGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";

import { useAuth } from "@/context/AuthContext.tsx";

import Loader from "@/components/common/Loader";

import { ROUTES } from "@/config/routes.ts";
import { IAuthor, IItem } from "@/types.ts";

const SingleItemPage = (): JSX.Element => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { user } = useAuth();

  const { data: item, isLoading: itemLoading, isError: itemError } = useQuery<{ data: IItem }>(`/items/${id}?tags=1`);

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

  console.log(item);

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
      <ListGroup className={"mt-3"}>
        <ListGroup.Item>
          <span className={"fw-semibold text-info"}>ID:</span> {item?.data.id}
        </ListGroup.Item>
        <ListGroup.Item>
          <span className={"fw-semibold text-info"}>{t("Name")}:</span> {item?.data.name}
        </ListGroup.Item>
        <ListGroup.Item>
          <span className={"fw-semibold text-info"}>{t("Collection")}:</span>{" "}
          <Link to={ROUTES.COLLECTIONS.COLLECTION.replace(":id", String(item?.data.collectionId))}>
            {item?.data?.collection?.name}
          </Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <span className={"fw-semibold text-info"}>{t("Author")}:</span> {item?.data?.author?.username}
        </ListGroup.Item>
      </ListGroup>
      <section className={"mt-3 d-flex flex-column gap-3"}>
        <h2>{t("Tags")}</h2>
        <ListGroup horizontal>
          {item?.data?.tags?.map((tag) => (
            <ListGroup.Item key={tag.id} action>
              {/*<Link to={ROUTES.TAGS.TAG.replace(":id", String(tag.id))}>{tag.name}</Link>*/}
              {tag.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </section>
    </Container>
  );
};

export default SingleItemPage;
