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

export interface ITag {
  id: number;
  name: string;
}

export interface IMeta {
  total: number;
  last_page: number;
  current_page: number;
}

export interface IItem {
  id: number;
  name: string;
  createdAt: string;
  collectionId: number;
  authorId: number;
  author: {
    username: string;
  };
  collection: {
    name: string;
  };
}
