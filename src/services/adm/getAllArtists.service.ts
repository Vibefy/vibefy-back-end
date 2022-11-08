import { classToPlain } from "class-transformer";
import { AppDataSource } from "../../data-source";
import Artist from "../../entities/artist.entity";

export const getAllArtistsService = async () => {
  const userRepository = AppDataSource.getRepository(Artist);

  const artist = await userRepository.find({relations : {music : true}});

  const artistNoPassword = classToPlain(artist);

  return artistNoPassword;
};
