export interface UserModel {
  id: number;
  email: string;
  name: string;
  roles: Role[];
}

export interface Role {
  id: number;
  name: string;
}
