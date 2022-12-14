import { classToPlain } from "class-transformer";
import Music from "../../../entities/music.entity";
import { AppDataSource } from "../../../data-source";
import Artist from "../../../entities/artist.entity";

export const getAllMusicService = async (idArtis: string) => {
  const musicRepository = AppDataSource.getRepository(Music);
  const artistRepository = AppDataSource.getRepository(Artist);
  const findArtist = await artistRepository.findOneBy({
    id: idArtis,
  });

  const musics = await musicRepository.findBy({
    artist: findArtist,
  });

  return classToPlain(musics);
};
