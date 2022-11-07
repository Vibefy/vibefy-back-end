import { AppError } from "../../error/appError";
import { AppDataSource } from "../../data-source";
import Playlist from "../../entities/playlist.entity";

export const listMusicsPlaylistService = async (id: string) => {
  const playlistRepository = AppDataSource.getRepository(Playlist);

  const playlistMusics = await playlistRepository.findOne({
    where: { id },
    relations: {
      music: true,
    },
  });

  if (!playlistMusics) {
    throw new AppError(404, "Playlist not found");
  }

  return playlistMusics;
};
