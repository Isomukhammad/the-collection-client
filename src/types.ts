import { ROLES } from "@/config/roles.ts";

export interface IUser {
  id: number;
  username: string;
  email: string;
  role: keyof typeof ROLES;
}

export interface IUserAdmin extends IUser {
  password: string;
  isBlocked: boolean;
  isDeleted: boolean;
}
