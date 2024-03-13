import { JSX, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";

import { ROLES } from "@/config/roles.ts";
import { IUserAdmin } from "@/types.ts";
import { baseAxios } from "@/utils/axios.ts";

interface UserTableModalProps {
  isAction: boolean;
  user: IUserAdmin;
}

interface FormValues {
  username: string;
  email: string;
  password: string | null;
  role: string;
  active: boolean;
}

const UserTableModal = ({
  isAction,
  user,
}: UserTableModalProps): JSX.Element => {
  const queryClient = useQueryClient();

  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      username: user.username,
      email: user.email,
      password: null,
      role: user.role,
      active: !user.isBlocked,
    },
  });
  const [error, setError] = useState<string>("");
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FormValues> = async (data): Promise<void> => {
    try {
      setIsLoading(true);
      await baseAxios.patch("/users/update", {
        username: data.username,
        email: data.email === user.email ? null : data.email,
        password: data.password,
        role: data.role,
        isBlocked: !data.active,
      });
      setError("");
      await queryClient.invalidateQueries("/users");
      setModalShow(false);
    } catch (error: any) {
      console.error(error);
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        type={"button"}
        variant={"info"}
        disabled={isAction}
        onClick={() => setModalShow(true)}
      >
        {t("Edit")}
      </Button>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {t("Edit user info")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {error && <p className={"text-danger fw-medium"}>{error}</p>}
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>{t("Name")}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t("Name")}
                {...register("username", { required: true })}
              />
              {errors.username && (
                <Form.Text className="text-danger">
                  {t("This field is required")}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>{t("Email")}</Form.Label>
              <Form.Control
                type="email"
                placeholder={t("Enter email")}
                {...register("email", { required: true })}
              />
              {errors.email && (
                <Form.Text className="text-danger">
                  {t("This field is required")}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>{t("Password")}</Form.Label>
              <Form.Control
                type="password"
                placeholder={t("Password")}
                {...register("password")}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicRole">
              <Form.Label>{t("Role")}</Form.Label>
              <Form.Check
                type="radio"
                label={t("Admin")}
                id={"admin"}
                value={ROLES.ADMIN}
                {...register("role")}
              />
              <Form.Check
                type="radio"
                label={t("User")}
                id={"user"}
                value={ROLES.USER}
                {...register("role")}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicActive">
              <Form.Check
                type="switch"
                label={t("Active")}
                id={"active"}
                {...register("active")}
              />
            </Form.Group>
            <Button
              variant={"primary"}
              type={"submit"}
              disabled={isAction || isLoading}
            >
              {t("Submit")}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UserTableModal;
