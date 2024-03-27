import { JSX, useState } from "react";
import { Accordion, Button, Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import { useQueryClient } from "react-query";
import { redirect } from "react-router-dom";

import { useAuth } from "@/context/AuthContext.tsx";

import { AddCollectionFormFields } from "@/components/forms/AddCollectionForm";

import { ROUTES } from "@/config/routes";
import { baseAxios } from "@/utils/axios.ts";
import { convertBase64 } from "@/utils/convert.ts";

const AddCollectionForm = (): JSX.Element => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const queryClient = useQueryClient();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AddCollectionFormFields>({
    defaultValues: {
      name: "",
      topic: "Books",
      description: "",
      image: null,
    },
  });

  const description = watch("description");

  const onSubmit: SubmitHandler<AddCollectionFormFields> = async (data): Promise<void> => {
    setIsLoading(true);
    let imageUrl = "";

    if (data.image && data.image[0]) {
      imageUrl = await convertBase64(data.image[0]);
    }

    try {
      await baseAxios.post("/collections", {
        name: data.name,
        topic: data.topic,
        description: data.description,
        image: imageUrl,
      });
      setError("");
      redirect(ROUTES.AUTH.PROFILE.MAIN);
      await queryClient.invalidateQueries(`/collections?authorId=${user?.id}`);
    } catch (error: any) {
      console.error(error);
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className={"mt-5 gap-3"}>
      {error && <p className={"text-danger fw-medium"}>{error}</p>}
      <div className={"row"}>
        <Form.Group controlId="formBasicName" className="mb-3 col-lg-6 col-md-12">
          <Form.Label>{t("Name")}</Form.Label>
          <Form.Control type="text" placeholder={t("Name of collection")} {...register("name", { required: true })} />
          {errors.name && <p className={"text-danger"}>{t("This field is required")}</p>}
        </Form.Group>
        <Form.Group controlId="formBasicTopic" className="mb-3 col-lg-6 col-md-12">
          <Form.Label>{t("Topic")}</Form.Label>
          <Form.Select {...register("topic")}>
            <option value="Books" defaultChecked>
              {t("Books")}
            </option>
            <option value="Signs">{t("Signs")}</option>
            <option value="Silverware">{t("Silverware")}</option>
          </Form.Select>
        </Form.Group>
      </div>
      <Form.Group className="mb-3 col" controlId="formBasicDescription">
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
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>{t("Preview")}</Accordion.Header>
          <Accordion.Body>
            <ReactMarkdown>{description ? description : t("Empty")}</ReactMarkdown>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Form.Group className="mb-3 col" controlId="formBasicImage">
        <Form.Label>{t("Image")}</Form.Label>
        <Form.Control type="file" {...register("image")} accept="image/*" />
      </Form.Group>
      <Button type="submit" title={t("Add")} disabled={isLoading} className={"w-25"}>
        {t("Add")}
      </Button>
    </Form>
  );
};

export default AddCollectionForm;
