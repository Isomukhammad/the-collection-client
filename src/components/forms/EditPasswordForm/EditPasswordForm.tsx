import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { FormValues } from "@/components/forms/EditPasswordForm/index.ts";

import { baseAxios } from "@/utils/axios.ts";

const EditPasswordForm = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [error, setError] = useState<string>("");

  const onSubmit: SubmitHandler<FormValues> = async (data): Promise<void> => {
    if (data.new_password !== data.confirm_password) {
      setError("Passwords do not match");
      return;
    }

    try {
      await baseAxios.put("/users/password/update", {
        current_password: data.current_password,
        new_password: data.new_password,
      });
      setError("");
      toast.success(t("Password changed successfully"));
    } catch (error: any) {
      console.error(error);
      setError(error.response.data.message);
      toast.error(t("Failed to change password"));
    }
  };

  return (
    <div className="my-5">
      <h2 className="my-3">{t("Change password")}</h2>
      {error && <p className={"text-danger fw-semibold"}>{error}</p>}
      <Form onSubmit={handleSubmit(onSubmit)} className={"d-flex flex-column gap-3 max-width-34"}>
        <Form.Group>
          <Form.Label>{t("Current password")}</Form.Label>
          <Form.Control type="password" {...register("current_password", { required: true })} />
          {errors.current_password && <p>{t("This field is required")}</p>}
        </Form.Group>
        <Form.Group>
          <Form.Label>{t("New password")}</Form.Label>
          <Form.Control type="password" {...register("new_password", { required: true })} />
          {errors.new_password && <p>{t("This field is required")}</p>}
        </Form.Group>
        <Form.Group>
          <Form.Label>{t("Confirm password")}</Form.Label>
          <Form.Control type="password" {...register("confirm_password", { required: true })} />
          {errors.confirm_password && <p>{t("This field is required")}</p>}
        </Form.Group>
        <Button type="submit" className={"w-25"}>
          {t("Save")}
        </Button>
      </Form>
    </div>
  );
};

export default EditPasswordForm;
