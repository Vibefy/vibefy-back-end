import { classToPlain } from "class-transformer";
import { AppDataSource } from "../../../data-source";
import Artist from "../../../entities/artist.entity";
import Music from "../../../entities/music.entity";
import { AppError } from "../../../error/appError";

export const getIdMusicService = async (id: string, idArtis: string) => {
  const musicRepository = AppDataSource.getRepository(Music);
  const artistRepository = AppDataSource.getRepository(Artist);
  const findArtist = await artistRepository.findOneBy({
    id: idArtis,
  });

  const music = await musicRepository.findBy({
    artist: findArtist,
    id: id,
  });

  if (!music) {
    new AppError(400, "Music not found");
  }

  return classToPlain(music);
};
