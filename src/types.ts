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

export interface ICollection {
  id: number;
  name: string;
  description: string;
  topic: string;
  img: string;
  authorId: number;
  createdAt: string;
}
