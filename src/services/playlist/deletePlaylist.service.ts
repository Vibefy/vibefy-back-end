import { AppDataSource } from "../../data-source";
import Playlist from "../../entities/playlist.entity";
import { AppError } from "../../error/appError";

export const deletePlaylistService = async (id: string): Promise<boolean> => {
  const deleteRepository = AppDataSource.getRepository(Playlist);

  const playlist = await deleteRepository.findOneBy({ id });

  if (!playlist) {
    throw new AppError(404, "Playlist not found");
  }

  await deleteRepository.delete(playlist);

  return true;
};
