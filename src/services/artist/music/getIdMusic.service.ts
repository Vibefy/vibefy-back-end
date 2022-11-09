import { classToPlain } from "class-transformer";
import { AppError } from "../../../error/appError";
import { AppDataSource } from "../../../data-source";
import Artist from "../../../entities/artist.entity";
import Music from "../../../entities/music.entity";

export const getIdMusicService = async (idMusic: string, idArtist: string) => {
  const musicRepository = AppDataSource.getRepository(Music);
  const artistRepository = AppDataSource.getRepository(Artist);

  const findArtist = await artistRepository.findOneBy({id: idArtist});

  const findMusic = await musicRepository.findOneBy({id : idMusic})

  if (!findArtist) {
    throw new AppError(404, "Music not found");
  }

  if (!findMusic) {
    throw new AppError(404, "Music not found");
  }
  
  const music = await musicRepository.findOne({where : {artist : findArtist,id : findMusic.id}});

  return classToPlain(music);
};
