import { JSX, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import { baseAxios } from "@/utils/axios.ts";

type LoginForm = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage = (): JSX.Element => {
  const navigate = useNavigate();

  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<LoginForm> = async (data): Promise<void> => {
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
                  {...register("username", {
                    required: t("Name is required"),
                  })}
                  placeholder={t("Your name")}
                />
                {errors.username && (
                  <p className={"text-danger"}>{errors.username.message}</p>
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
                    minLength: {
                      value: 6,
                      message: t("Password must have at least 6 characters"),
                    },
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
                    required: t("Confirmation of password is required"),
                    minLength: {
                      value: 6,
                      message: t("Password must have at least 6 characters"),
                    },
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
              <Link to={"/login"}>{t("Login")}</Link>
            </p>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default RegisterPage;
