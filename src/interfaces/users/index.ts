export interface IUserRequest {
  name: string;
  email: string;
  password: string;
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

export interface IUserUpdateParam {
  id : string;
  name?: string;
  email?: string;
  password?: string;
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
