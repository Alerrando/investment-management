export interface Role {
  id: number;
  name: string;
}
export interface ReturnResponseUser {
  user: UserModel;
  status: number;
  message: string;
}

export type UserModel = {
  id: number;
  email: string;
  name: string;
  roles: Role[];
};
