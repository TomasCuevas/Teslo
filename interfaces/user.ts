export interface IUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
}
