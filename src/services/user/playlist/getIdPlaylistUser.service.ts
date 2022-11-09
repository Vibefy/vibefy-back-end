import User from "../../../entities/user.entity";
import { AppError } from "../../../error/appError";
import { AppDataSource } from "../../../data-source";

export const getIdPlaylistUserService = async (
  id: string,
  id_playlist: string
) => {
  const userRepository = AppDataSource.getRepository(User);
  const userPlaylist = await userRepository.findOne({
    where: { id: id },
    relations: { playlist: true },
  });

  if (!userPlaylist) {
    throw new AppError(404, "User is not found");
  }

  const playlistUserFind = userPlaylist.playlist.find(
    (elem) => elem.id == id_playlist
  );

  if (!playlistUserFind) {
    throw new AppError(404, "PlayList is not found");
  }

  return playlistUserFind;
};
