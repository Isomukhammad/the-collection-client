import { JSX, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { baseAxios } from "@/utils/axios.ts";

type LoginForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage = (): JSX.Element => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<LoginForm> = async (data): Promise<void> => {
    setError("");
    setIsLoading(true);
    try {
      const res = await baseAxios.post("/users/register", data);
      console.log(res);
    } catch (error: any) {
      console.error(error);
      if (error && error.response && error.response.data.message) {
        setError(error.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <Container>
        <Row className="justify-content-md-center align-items-center min-vh-100">
          <Col lg="5" className="p-3 rounded">
            <h1 className={"text-center mb-3"}>{t("Register")}</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
              {error && <p className={"text-danger"}>{error}</p>}
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>{t("Name")}</Form.Label>
                <Form.Control
                  type="text"
                  {...register("name", {
                    required: t("Name is required"),
                  })}
                  placeholder={t("Your name")}
                />
                {errors.name && (
                  <p className={"text-danger"}>{errors.name.message}</p>
                )}
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
                {errors.email && (
                  <p className={"text-danger"}>{errors.email.message}</p>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>{t("Password")}</Form.Label>
                <Form.Control
                  type="password"
                  {...register("password", {
                    required: t("Password is required"),
                  })}
                  placeholder={t("Password")}
                />
                {errors.password && (
                  <p className={"text-danger"}>{errors.password.message}</p>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                <Form.Label>{t("Confirm Password")}</Form.Label>
                <Form.Control
                  type="password"
                  {...register("confirmPassword", {
                    required: "Confirmation of password is required",
                  })}
                  placeholder={t("Confirm Password")}
                />
                {errors.confirmPassword && (
                  <p className={"text-danger"}>
                    {errors.confirmPassword.message}
                  </p>
                )}
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                disabled={isLoading}
                className={"w-100"}
              >
                {t("Submit")}
              </Button>
            </Form>
            <p className={"text-center mt-3 fw-medium"}>
              {t("Already have an account?")}{" "}
              <Link to={"/register"}>{t("Login")}</Link>
            </p>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default RegisterPage;
