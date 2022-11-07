export interface IAdmRequest {
  name: string;
  email: string;
  password: string;
  avatar_img? : string;
  admHash: string;
}

export interface IAdm {
  id : string;
  name: string;
  email: string;
  avatar_img? : string;
  created_At : Date;
  updated_At : Date;
}

export interface IAdmLogin {
  email: string;
  password: string;
}

export interface IAdmUpdateParam {
  name?: string;
  email?: string;
  password?: string;
  id: string;
  type?: string
}

export interface IAdmUpdate {
  name?: string;
  email?: string;
  password?: string;
}

export interface IAdmDelete{
  id: string
}
