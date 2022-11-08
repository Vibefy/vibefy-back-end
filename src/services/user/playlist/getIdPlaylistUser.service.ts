import User from "../../../entities/user.entity";
import { AppError } from "../../../error/appError";
import { AppDataSource } from "../../../data-source";
import Playlist from "../../../entities/playlist.entity";

export const getIdPlaylistUserService = async (
  id: string,
  id_playlist: string
) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id });
  const playlistRepository = AppDataSource.getRepository(Playlist);
  const playlistFind = await playlistRepository.findOneBy({ id: id_playlist });

  if (!playlistFind) {
    throw new AppError(400, "Playlist is not found");
  }

  const playlistUser = user.playlist.find(() => id == id_playlist);

  if (!playlistUser) {
    throw new AppError(400, "Playlist is not found");
  }

  return playlistUser;
};
