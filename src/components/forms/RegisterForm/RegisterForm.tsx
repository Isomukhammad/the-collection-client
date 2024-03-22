import { JSX, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { RegisterFormValues } from "@/components/forms/RegisterForm";

import { baseAxios } from "@/utils/axios.ts";

const RegisterForm = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data): Promise<void> => {
    setError("");
    setIsLoading(true);
    try {
      await baseAxios.post("/auth/register", {
        username: data.username,
        email: data.email,
        password: data.password,
      });
      toast.success(t("You have successfully registered!"));
      navigate("/login");
    } catch (error: any) {
      console.error(error);
      toast.error(t("Failed to register!"));
      if (error.response.data.message) {
        setError(error.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {error && <p className={"text-danger"}>{error}</p>}
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>{t("Name")}</Form.Label>
        <Form.Control
          type="text"
          {...register("username", {
            required: t("Name is required"),
          })}
          placeholder={t("Your name")}
        />
        {errors.username && <p className={"text-danger"}>{errors.username.message}</p>}
      </Form.Group>
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
      <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
        <Form.Label>{t("Confirm Password")}</Form.Label>
        <Form.Control
          type="password"
          {...register("confirmPassword", {
            required: t("Confirmation of password is required"),
            minLength: {
              value: 6,
              message: t("Password must have at least 6 characters"),
            },
          })}
          placeholder={t("Confirm Password")}
        />
        {errors.confirmPassword && <p className={"text-danger"}>{errors.confirmPassword.message}</p>}
      </Form.Group>
      <Button variant="primary" type="submit" disabled={isLoading} className={"w-100"}>
        {t("Submit")}
      </Button>
    </Form>
  );
};

export default RegisterForm;
