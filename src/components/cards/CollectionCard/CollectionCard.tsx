import { JSX } from "react";
import { Card, Ratio } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { CollectionCardProps } from "@/components/cards/CollectionCard";

import { ROUTES } from "@/config/routes.ts";

const CollectionCard = ({ id, img, name, description }: CollectionCardProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Card>
      <Ratio aspectRatio="1x1">
        <Card.Img src={img || "/images/placeholder.webp"} alt={name} className={"card-img-top object-fit-cover"} />
      </Ratio>
      <Card.Body>
        <Card.Title className={"text-ellipsis-2 card-title"} style={{ minHeight: "48px" }}>
          {name}
        </Card.Title>
        <Card.Text className={"text-truncate"}>{description.replaceAll("#", "")}</Card.Text>
      </Card.Body>
      <Link to={ROUTES.COLLECTIONS.COLLECTION.replace(":id", id.toString())} className={"btn btn-primary"}>
        {t("View collection")}
      </Link>
    </Card>
  );
};

export default CollectionCard;
