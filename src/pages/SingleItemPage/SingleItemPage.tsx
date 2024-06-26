import { JSX } from "react";
import { Button, Container, ListGroup } from "react-bootstrap";
import { Gear, Trash } from "react-bootstrap-icons";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useAuth } from "@/context/AuthContext.tsx";

import Loader from "@/components/common/Loader";
import EditItemModal from "@/components/modals/EditItemModal";

import { ROUTES } from "@/config/routes.ts";
import { IItem } from "@/types.ts";
import { baseAxios } from "@/utils/axios";

const SingleItemPage = (): JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useTranslation();
  const { user } = useAuth();

  const {
    data: item,
    isLoading: itemLoading,
    isError: itemError,
    refetch,
  } = useQuery<{ data: IItem }>(`/items/${id}?tags=1`);

  const handleItemDelete = async (): Promise<void> => {
    try {
      await baseAxios.delete(`/items/${id}`);
      toast.success(t("Deleted successfully"), {
        id: "toast",
      });
      navigate(ROUTES.AUTH.PROFILE.MAIN);
    } catch (e) {
      console.error(e);
      toast.error(t("Error"), {
        id: "toast",
      });
    }
  };

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

  if (item)
    return (
      <Container as={"main"} className="my-5">
        <div className={"d-flex justify-content-between align-items-center"}>
          <h1>{item?.data.name}</h1>
          {(item?.data.authorId === user?.id || user?.role === "ADMIN") && (
            <div className={"d-flex gap-2"}>
              <EditItemModal
                id={item.data.id}
                name={item.data.name}
                tags={item.data.tags ? item.data.tags : []}
                refetch={refetch}
              />
              <Button
                variant={"danger"}
                type={"button"}
                title={t("Delete")}
                onClick={handleItemDelete}
                className={"d-flex align-items-center gap-1"}
              >
                <Trash />
                <span>{t("Delete")}</span>
              </Button>
              <Link
                to={ROUTES.ITEMS.EDITITEM.replace(":id", String(id))}
                title={t("Add item")}
                className={"btn btn-info d-flex align-items-center gap-1"}
              >
                <Gear />
                <span>{t("Edit")}</span>
              </Link>
            </div>
          )}
        </div>
        <ListGroup className={"mt-3"}>
          <ListGroup.Item>
            <span className={"fw-semibold text-info"}>ID:</span> {item.data.id}
          </ListGroup.Item>
          <ListGroup.Item>
            <span className={"fw-semibold text-info"}>{t("Name")}:</span> {item.data.name}
          </ListGroup.Item>
          <ListGroup.Item>
            <span className={"fw-semibold text-info"}>{t("Collection")}:</span>{" "}
            <Link to={ROUTES.COLLECTIONS.COLLECTION.replace(":id", String(item.data.collectionId))}>
              {item.data?.collection?.name}
            </Link>
          </ListGroup.Item>
          <ListGroup.Item>
            <span className={"fw-semibold text-info"}>{t("Author")}:</span> {item.data?.author?.username}
          </ListGroup.Item>
        </ListGroup>
        <section className={"mt-3 d-flex flex-column gap-3"}>
          <h2>{t("Tags")}</h2>
          <ListGroup horizontal>
            {item?.data?.tags?.map((tag) => (
              <ListGroup.Item key={tag.id} action>
                {tag.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </section>
      </Container>
    );

  return <></>;
};

export default SingleItemPage;
