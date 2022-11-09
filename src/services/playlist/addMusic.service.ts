import Music from "../../entities/music.entity";
import { AppError } from "../../error/appError";
import { AppDataSource } from "../../data-source";
import Playlist from "../../entities/playlist.entity";

export const addMusicPlaylistService = async (id: string, id_music: string) => {
  const playlistRepository = AppDataSource.getRepository(Playlist);
  const musicRepository = AppDataSource.getRepository(Music);

  const playlist = await playlistRepository.findOneBy({ id });

  if (!playlist) {
    throw new AppError(404, "Playlist not found");
  }

  const music = await musicRepository.findOneBy({ id: id_music });

  if (!music) {
    throw new AppError(404, "Music not found");
  }

  playlist.music = [...playlist.music, music];

  await playlistRepository.save(playlist);

  return music;
};
