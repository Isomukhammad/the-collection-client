import { JSX, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Gear } from "react-bootstrap-icons";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { AddCollectionFormFields } from "@/components/forms/AddCollectionForm";
import { EditCollectionModalProps } from "@/components/modals/EditCollectionModal";

import { baseAxios } from "@/utils/axios";
import { convertBase64 } from "@/utils/convert";

const EditCollectionModal = ({ id, name, topic, description, refetch }: EditCollectionModalProps): JSX.Element => {
  const { t } = useTranslation();
  const [modalShow, setModalShow] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddCollectionFormFields>({
    defaultValues: {
      name,
      topic,
      description,
    },
  });
  const [error, setError] = useState<string>("");

  const onSubmit: SubmitHandler<AddCollectionFormFields> = async (data): Promise<void> => {
    let imageUrl = "";

    if (data.image && data.image[0]) {
      imageUrl = await convertBase64(data.image[0]);
    }

    try {
      await baseAxios.patch(`/collections/${id}`, {
        name: data.name,
        description: data.description,
        topic: data.topic,
        img: imageUrl ? imageUrl : undefined,
      });
      setError("");
      refetch();
      toast.success(t("Updated successfully"));
      setModalShow(false);
    } catch (error: any) {
      console.error(error);
      setError(error.response.data.message);
      toast.error(t("Error"));
    }
  };

  return (
    <>
      <Button
        type={"button"}
        variant={"success"}
        onClick={() => setModalShow(true)}
        className={"d-flex align-items-center gap-1"}
      >
        <Gear />
        <span>{t("Edit")}</span>
      </Button>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">{t("Edit user info")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {error && <p className={"text-danger fw-medium"}>{error}</p>}
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>{t("Name")}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t("Name of collection")}
                {...register("name", { required: true })}
              />
              {errors.name && <p className={"text-danger"}>{t("This field is required")}</p>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicTopic">
              <Form.Label>{t("Topic")}</Form.Label>
              <Form.Select {...register("topic")}>
                <option value="Books">{t("Books")}</option>
                <option value="Signs">{t("Signs")}</option>
                <option value="Silverware">{t("Silverware")}</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDescription">
              <Form.Label>
                {t("Description")} ({t("Markdown is supported")})
              </Form.Label>
              <Form.Control
                as={"textarea"}
                placeholder={t("Description of collection")}
                {...register("description", { required: true })}
              />
              {errors.description && <p className={"text-danger"}>{t("This field is required")}</p>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicImage">
              <Form.Label>{t("Image")}</Form.Label>
              <Form.Control type="file" {...register("image")} accept="image/*" />
            </Form.Group>

            <Button variant={"primary"} type={"submit"} disabled={isSubmitting}>
              {t("Submit")}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditCollectionModal;
