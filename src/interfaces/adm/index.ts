export interface IAdmRequest {
  name: string;
  email: string;
  password: string;
  admHash: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserUpdateParamenst {
  name?: string;
  email?: string;
  password?: string;
  id: string;
  type?: string
}

export interface IUserUpdate {
  name?: string;
  email?: string;
  password?: string;
}

export interface IuserDelete{
  id: string
}
