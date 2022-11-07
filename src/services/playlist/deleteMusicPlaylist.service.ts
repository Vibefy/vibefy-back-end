import Music from "../../entities/music.entity";
import { AppError } from "../../error/appError";
import { AppDataSource } from "../../data-source";
import Playlist from "../../entities/playlist.entity";

export const deleteMusicPlaylistService = async (
  id: string,
  id_music: string
): Promise<boolean> => {
  const deleteRepository = AppDataSource.getRepository(Playlist);
  const musicRepository = AppDataSource.getRepository(Music);

  const playlist = await deleteRepository.findOneBy({ id });

  if (!playlist) {
    throw new AppError(404, "Playlist not found");
  }

  const music = await musicRepository.findOneBy({ id: id_music });

  if (!music) {
    throw new AppError(404, "Music not found");
  }

  const filteredMusics = playlist.music.filter((elem) => elem.id !== id_music);

  playlist.music = filteredMusics;
  await deleteRepository.save(playlist);

  return true;
};
