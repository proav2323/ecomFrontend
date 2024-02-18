export interface User {
  name: string;
  password: string;
  email: string;
  role: ROLE;
  id: string;
}

export enum ROLE {
  ADMIN,
  USER,
}
