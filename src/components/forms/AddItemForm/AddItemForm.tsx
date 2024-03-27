import { JSX } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import TagInput from "@/components/inputs/TagInput";

const AddItemForm = (): JSX.Element => {
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column mt-5 gap-3" noValidate>
      <TagInput />
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
        <Form.Control type="text" placeholder="Enter tags" />
      </Form.Group>
      {/* two inputs for name and value. Both inputs in one line and in desktop is grid */}
      <div className="d-flex flex-column gap-2 align-items-center">
        <Form.Label className="fw-semibold w-100">{t("Optional text")}</Form.Label>
        <div className={"row gap-3 w-100"}>
          <Form.Control type="text" placeholder={t("Enter name")} className="col" />
          <Form.Control type="number" placeholder={t("Enter value")} className="col" />
        </div>
        <div className={"row gap-3 w-100"}>
          <Form.Control type="text" placeholder={t("Enter name")} className="col" />
          <Form.Control type="number" placeholder={t("Enter value")} className="col" />
        </div>
        <div className={"row gap-3 w-100"}>
          <Form.Control type="text" placeholder={t("Enter name")} className="col" />
          <Form.Control type="number" placeholder={t("Enter value")} className="col" />
        </div>
      </div>
      <div className="d-flex flex-column gap-2 align-items-center">
        <Form.Label className="fw-semibold w-100">{t("Optional text")}</Form.Label>
        <div className={"row gap-3 w-100"}>
          <Form.Control type="text" placeholder={t("Enter name")} className="col" />
          <Form.Control type="text" placeholder={t("Enter value")} className="col" />
        </div>
        <div className={"row gap-3 w-100"}>
          <Form.Control type="text" placeholder={t("Enter name")} className="col" />
          <Form.Control type="text" placeholder={t("Enter value")} className="col" />
        </div>
        <div className={"row gap-3 w-100"}>
          <Form.Control type="text" placeholder={t("Enter name")} className="col" />
          <Form.Control type="text" placeholder={t("Enter value")} className="col" />
        </div>
      </div>
      <div className="d-flex flex-column gap-2 align-items-center">
        <Form.Label className="fw-semibold w-100">
          {t("Optional text")} ({t("Markdown is supported")})
        </Form.Label>
        <div className={"row gap-3 w-100 d-flex align-items-start"}>
          <Form.Control type="text" placeholder={t("Enter name")} className="col" />
          <Form.Control as="textarea" placeholder={t("Enter value")} className="col" />
        </div>
        <div className={"row gap-3 w-100 d-flex align-items-start"}>
          <Form.Control type="text" placeholder={t("Enter name")} className="col" />
          <Form.Control as="textarea" placeholder={t("Enter value")} className="col" />
        </div>
        <div className={"row gap-3 w-100 d-flex align-items-start"}>
          <Form.Control type="text" placeholder={t("Enter name")} className="col" />
          <Form.Control as="textarea" placeholder={t("Enter value")} className="col" />
        </div>
      </div>
      <div className="d-flex flex-column gap-2 align-items-center">
        <Form.Label className="fw-semibold w-100">{t("Optional date")}</Form.Label>
        <div className={"row gap-3 w-100"}>
          <Form.Control type="text" placeholder={t("Enter name")} className="col" />
          <Form.Control type="date" className="col" />
        </div>
        <div className={"row gap-3 w-100"}>
          <Form.Control type="text" placeholder={t("Enter name")} className="col" />
          <Form.Control type="date" className="col" />
        </div>
        <div className={"row gap-3 w-100"}>
          <Form.Control type="text" placeholder={t("Enter name")} className="col" />
          <Form.Control type="date" className="col" />
        </div>
      </div>

      <Button type="submit">{t("Submit")}</Button>
    </Form>
  );
};

export default AddItemForm;
