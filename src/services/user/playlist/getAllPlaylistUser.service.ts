import User from "../../../entities/user.entity";
import { AppError } from "../../../error/appError";
import { AppDataSource } from "../../../data-source";

export const getAllPlaylistUserService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const userPlaylist = await userRepository.findOne({
    where: { id: id },
    relations: { playlist: true },
  });

  if (!userPlaylist) {
    throw new AppError(404, "User is not found");
  }

  return userPlaylist.playlist;
};
