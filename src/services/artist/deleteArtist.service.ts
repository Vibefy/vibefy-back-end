import { AppError } from "../../error/appError";
import { AppDataSource } from "../../data-source";
import Artist from "../../entities/artist.entity";

export const deleteArtistService = async (id: string) => {
  const artistRepository = AppDataSource.getRepository(Artist);
  const artist = await artistRepository.findOneBy({ id });
  if (artist!.isActive === false) {
    throw new AppError(400, "artist is not active");
  }
  artistRepository.update(artist!.id, {
    isActive: false,
  });
  return true;
};
