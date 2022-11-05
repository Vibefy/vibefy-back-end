export interface IArtistRequest {
  name: string;
  email: string;
  password: string;
}
export interface IArtistUpdateRequest{
  name?: string;
  email?: string;
  password?: string;
  id: string;
  type?: string
}
