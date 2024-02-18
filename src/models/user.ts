export interface User {
  name: string;
  password: string;
  email: string;
  role: string;
  id: string;
}

export enum ROLE {
  ADMIN,
  USER,
}
