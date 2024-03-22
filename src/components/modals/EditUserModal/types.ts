import { IUserAdmin } from "@/types.ts";

export interface UserTableModalProps {
  isAction: boolean;
  user: IUserAdmin;
}

export interface EditUserFormValues {
  username: string;
  email: string;
  password: string | null;
  role: string;
  active: boolean;
}
