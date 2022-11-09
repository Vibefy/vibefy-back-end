import User from "../../../entities/user.entity";
import { AppError } from "../../../error/appError";
import { AppDataSource } from "../../../data-source";
import Playlist from "../../../entities/playlist.entity";

export const deleteIdPlaylistUserService = async (
  id: string,
  id_playlist: string
) => {
  const playlistRepository = AppDataSource.getRepository(Playlist);
  const playlist = await playlistRepository.findOneBy({ id: id_playlist });

  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id: id });

  if (!playlist) {
    throw new AppError(404, "Playlist not found");
  }

  if (!user) {
    throw new AppError(404, "User not found");
  }

  const filteredPlaylist = user.playlist.filter(
    (elem) => elem.id !== id_playlist
  );
  console.log(filteredPlaylist);
  user.playlist = filteredPlaylist;
  await userRepository.save(user);

  return true;
};
