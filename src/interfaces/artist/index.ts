export interface IArtistRequest {
  name: string;
  email: string;
  password: string;
  avatar_img? : string;
}
export interface IArtistUpdate {
  name?: string;
  email?: string;
  password?: string;
}
export interface IArtistUpdateRequest{
  name?: string;
  email?: string;
  password?: string;
  id: string;
  type?: string
}
