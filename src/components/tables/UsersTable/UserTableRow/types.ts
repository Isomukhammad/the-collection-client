import { IUserAdmin } from "@/types.ts";

export interface UserTableRowProps {
  user: IUserAdmin;
  refetchUsers: () => void;
}
