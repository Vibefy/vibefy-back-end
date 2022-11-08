import { AppDataSource } from "../../../data-source";
import Playlist from "../../../entities/playlist.entity";
import User from "../../../entities/user.entity";
import { AppError } from "../../../error/appError";

export const getIdPlaylistUserService = async (id:string, id_playlist:string) => {
  const userRepository = AppDataSource.getRepository(User)
  const user = await userRepository.findOneBy({id})
  const playlistRepository = AppDataSource.getRepository(Playlist)
  const playlistFind = await  playlistRepository.findOneBy({id: id_playlist})

  if(!playlistFind){
    throw new AppError(400, "não encontro a playlist")
  }

  const playlistUser = user.playlist.find(() => id == id_playlist)
  console.log(playlistUser)

  if(!playlistUser){
    throw new AppError(400, "não encontro a playlist")
  }

  return playlistUser
};
