import { AppError } from "../../error/appError";
import { AppDataSource } from "../../data-source";
import Playlist from "../../entities/playlist.entity";

export const createPlaylistService = async (name: string) => {
  const playlistRepository = AppDataSource.getRepository(Playlist);

  const playlistAlreadyExist = await playlistRepository.findOneBy({ name });

  if (playlistAlreadyExist) {
    throw new AppError(403, "Playlist already exist");
  }

  const playlist = new Playlist();
  playlist.name = name;
  playlist.created_At = new Date();
  playlist.updated_At = new Date();

  await playlistRepository.save(playlist);

  return playlist;
};
