import { classToPlain } from "class-transformer";
import { AppError } from "../../../error/appError";
import Music from "../../../entities/music.entity";
import Artist from "../../../entities/artist.entity";
import { AppDataSource } from "../../../data-source";
import { IMusicRequest } from "../../../interfaces/artist/music/";

export const createMusicService = async ({
  name,
  id,
  genre,
  description,
  duration,
}: IMusicRequest) => {
  const musicRepository = AppDataSource.getRepository(Music);

  const musicAlreadyExists = await musicRepository.findOneBy({
    name,
  });

  const artistRepository = AppDataSource.getRepository(Artist);
  const artists = await artistRepository.findOneBy({
    id,
  });

  if (!artists) {
    throw new AppError(400, "Artist not found");
  }

  if (musicAlreadyExists) {
    throw new AppError(400, "Music already exists");
  }

  const date = new Date();

  const music = new Music();
  music.artist = artists;
  music.name = name;
  music.artistName = artists.name;
  music.description = description ? description : null;
  music.duration = duration ? Number(duration) : null;
  music.genre = genre;
  music.created_At = date;
  music.updated_At = date;

  await musicRepository.save(music);
  musicRepository.create(music);

  return classToPlain(music);
};
