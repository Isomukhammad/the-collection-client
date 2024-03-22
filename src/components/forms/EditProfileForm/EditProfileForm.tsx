import { JSX, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { useAuth } from "@/context/AuthContext.tsx";

import { EditProfileFormValues } from "@/components/forms/EditProfileForm/types.ts";

import { baseAxios } from "@/utils/axios.ts";

const EditProfileForm = (): JSX.Element => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileFormValues>({
    defaultValues: {
      username: user?.username,
      email: user?.email,
    },
  });

  const onSubmit: SubmitHandler<EditProfileFormValues> = async (data): Promise<void> => {
    try {
      setIsLoading(true);
      const res = await baseAxios.patch("/users/update", {
        id: user?.id,
        username: data.username,
        email: data.email,
      });
      toast.success(res.data.message, {
        id: "toast",
      });
      setError("");
    } catch (error: any) {
      console.error(error);
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-5">
      {error && <p className={"text-danger fw-semibold"}>{error}</p>}
      <Form onSubmit={handleSubmit(onSubmit)} className={"d-flex flex-column gap-3 max-width-34"}>
        <Form.Group>
          <Form.Label>{t("Name")}</Form.Label>
          <Form.Control type="text" {...register("username", { required: true })} />
          {errors.username && <p>{t("This field is required")}</p>}
        </Form.Group>
        <Form.Group>
          <Form.Label>{t("Email")}</Form.Label>
          <Form.Control type="email" {...register("email", { required: true })} />
          {errors.email && <p>{t("This field is required")}</p>}
        </Form.Group>
        <Button type="submit" disabled={isLoading} className={"w-25"}>
          {t("Save")}
        </Button>
      </Form>
    </div>
  );
};

export default EditProfileForm;
