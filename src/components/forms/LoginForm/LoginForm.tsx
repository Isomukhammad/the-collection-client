import { JSX, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { useAuth } from "@/context/AuthContext.tsx";

import { LoginFormValues } from "@/components/forms/LoginForm";

import { baseAxios } from "@/utils/axios.ts";

const LoginForm = (): JSX.Element => {
  const { t } = useTranslation();
  const { setBearerToken } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (data): Promise<void> => {
    setIsLoading(true);
    try {
      const res = await baseAxios.post("/auth/login", data);
      const { token } = res.data;
      setBearerToken(token);
      setError("");
      toast.success(t("You have successfully logged in!"));
    } catch (error: any) {
      toast.error(t("Failed to login!"));
      if (error && error.response && error.response.data.message) {
        setError(error.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {error && <p className={"text-danger fw-medium"}>{error}</p>}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>{t("Email address")}</Form.Label>
        <Form.Control
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: t("Entered value does not match email format"),
            },
          })}
          placeholder={t("Enter email")}
        />
        {errors.email && <p className={"text-danger"}>{errors.email.message}</p>}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>{t("Password")}</Form.Label>
        <Form.Control
          type="password"
          {...register("password", {
            required: t("Password is required"),
            minLength: {
              value: 6,
              message: t("Password must have at least 6 characters"),
            },
          })}
          placeholder={t("Password")}
        />
        {errors.password && <p className={"text-danger"}>{errors.password.message}</p>}
      </Form.Group>
      <Button variant="primary" type="submit" disabled={isLoading} className={"w-100"}>
        {t("Submit")}
      </Button>
    </Form>
  );
};

export default LoginForm;
