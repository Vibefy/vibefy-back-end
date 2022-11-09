import { classToPlain } from "class-transformer";
import Artist from "../../entities/artist.entity";
import { AppDataSource } from "../../data-source";

export const getArtistService = async (id: string) => {
  const artistRepository = AppDataSource.getRepository(Artist);
  const artist = await artistRepository.findOneBy({
    id,
  });

  return classToPlain(artist);
};
