import { AppDataSource } from "../../data-source";
import Playlist from "../../entities/playlist.entity";
import { AppError } from "../../error/appError";

export const listPlaylistService = async () => {
  const playlistsRepository = AppDataSource.getRepository(Playlist);

  const playlists = await playlistsRepository.find();

  if (playlists.length === 0) {
    throw new AppError(404, "You don't have any playlists");
  }

  return playlists;
};
