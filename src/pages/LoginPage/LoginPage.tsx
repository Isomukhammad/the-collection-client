import { JSX, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { baseAxios } from "@/utils/axios.ts";

type LoginForm = {
  email: string;
  password: string;
};

const LoginPage = (): JSX.Element => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginForm> = async (data): Promise<void> => {
    setError("");
    setIsLoading(true);
    try {
      const res = await baseAxios.post("/users/login", data);
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
            <h1 className={"text-center mb-3"}>{t("Login")}</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
              {error && <p className={"text-danger"}>{error}</p>}
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
              {t("Don't have an account?")}{" "}
              <Link to={"/register"}>{t("Register")}</Link>
            </p>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default LoginPage;
