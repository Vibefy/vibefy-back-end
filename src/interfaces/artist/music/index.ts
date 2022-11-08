export interface IMusicRequest {
  name: string;
  id: string;
  genre: string;
  description?: string;
  duration?: string;
}

export interface IMusicCreate {
  name: string;
  genre: string;
  description?: string;
  duration?: string;
}
