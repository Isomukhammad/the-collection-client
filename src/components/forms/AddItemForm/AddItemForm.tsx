import { JSX, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import { AddItemFormFields } from "@/components/forms/AddItemForm/types.ts";
import TagInput from "@/components/inputs/TagInput";

import { ROUTES } from "@/config/routes.ts";
import { baseAxios } from "@/utils/axios.ts";

const AddItemForm = (): JSX.Element => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { register, control, handleSubmit } = useForm<AddItemFormFields>({
    defaultValues: {
      name: "",
      tags: [],
    },
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const onSubmit: SubmitHandler<AddItemFormFields> = async (data): Promise<void> => {
    setIsLoading(true);
    try {
      const tags = data.tags.map((tag) => tag.label);
      await baseAxios.post("/items", {
        collection_id: Number(id),
        name: data.name,
        tags: tags,
      });
      toast.success(t("Item added"));
      navigate(ROUTES.COLLECTIONS.COLLECTION.replace(":id", String(id)));
    } catch (error: any) {
      console.error(error);
      if (error.response.data.message) setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column mt-5 gap-3" noValidate>
      {error && <p className="text-danger fw-semibold">{error}</p>}
      <Form.Group controlId="formBasicName">
        <Form.Label className="fw-semibold">{t("Name")}</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          {...register("name", {
            required: true,
          })}
        />
      </Form.Group>
      <Form.Group controlId="formBasicTags">
        <Form.Label className="fw-semibold">{t("Tags")}</Form.Label>
        <TagInput control={control} />
      </Form.Group>
      <Button type="submit" disabled={isLoading}>
        {t("Submit")}
      </Button>
    </Form>
  );
};

export default AddItemForm;
