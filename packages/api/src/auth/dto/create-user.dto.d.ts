import { Roles } from "../../users/user.entity";

export interface CreateUserBodyDto {
  username: string;
  password: string;
  key: string;
  roles: Roles[];
}
