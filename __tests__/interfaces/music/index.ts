export interface IMusicCreate
{
	id : string
    name:string
	artistName: string
	genre: string,
	music_url : string,
	image_url : string,
	description?: string
	duration?:  number	
	created_At : Date
	updated_At : Date
}