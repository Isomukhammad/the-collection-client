import { JSX, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Gear } from "react-bootstrap-icons";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { AddItemFormFields } from "@/components/forms/AddItemForm";
import TagInput from "@/components/inputs/TagInput";
import { EditItemModalProps } from "@/components/modals/EditItemModal";

import { baseAxios } from "@/utils/axios";

const EditItemModal = ({ id, name, tags, refetch }: EditItemModalProps): JSX.Element => {
  const { t } = useTranslation();
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AddItemFormFields>({
    defaultValues: {
      name: name,
      tags: tags.map((tag) => ({ value: String(tag.id), label: tag.name })),
    },
  });

  const onSubmit: SubmitHandler<AddItemFormFields> = async (data): Promise<void> => {
    try {
      console.log(data);
      await baseAxios.patch(`/items/${id}`, {
        name: data.name,
        tags: data.tags.map((tag) => tag.label),
      });
      toast.success(t("Updated successfully"));
      refetch();
      setModalShow(false);
    } catch (error: any) {
      console.error(error);
      setError(error.response.data.message);
      toast.error(t("Error"));
    }
  };

  useEffect(() => {
    reset();
  }, [modalShow, reset, name, tags]);

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
          <Modal.Title id="contained-modal-title-vcenter">{t("Edit item info")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {error && <p className={"text-danger fw-medium"}>{error}</p>}
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>{t("Name")}</Form.Label>
              <Form.Control type="text" placeholder={t("Name")} {...register("name", { required: true })} />
              {errors.name && <p className={"text-danger"}>{t("This field is required")}</p>}
            </Form.Group>
            <Form.Group controlId="formBasicTags">
              <Form.Label className="fw-semibold">{t("Tags")}</Form.Label>
              <TagInput control={control} />
            </Form.Group>
            <Button variant={"primary"} type={"submit"} disabled={isSubmitting} className="mt-3">
              {t("Submit")}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditItemModal;
