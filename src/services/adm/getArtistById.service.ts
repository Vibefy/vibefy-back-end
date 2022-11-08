import { AppError } from "../../error/appError";
import { classToPlain } from "class-transformer";
import { AppDataSource } from "../../data-source";
import Artist from "../../entities/artist.entity";

export const getArtistByIdService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(Artist);

  const artist = await userRepository.findOne({where : {id},relations : {music : true}});
  if (artist) 
  {
    return classToPlain(artist);
  } 
  else 
  {
      throw new AppError(404, "Artist not exist");
  }
};
