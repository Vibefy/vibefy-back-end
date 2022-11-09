export interface IUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  avatar_img: string;
  created_At: Date;
  updated_At: Date;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserUpdateParam {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  type?: string;
}

export interface IUserUpdate {
  name?: string;
  email?: string;
  password?: string;
}

export interface IuserDelete {
  id: string;
}
