import User from "../../entities/user.entity";
import { AppError } from "../../error/appError";
import { AppDataSource } from "../../data-source";
import Artist from "../../entities/artist.entity";

export const deleteArtistByIdService = async (id: string) => {
  
    const artRepository = AppDataSource.getRepository(Artist);

    const arts = await artRepository.findOneBy({ id });

    arts.isActive

    if (arts) {
        if(arts.isActive === false)
        {
          throw new AppError(400, "Artist has already been deleted or does not exist");
        }
      artRepository.update(arts!.id, {
        isActive: false,
      });

      return true;
    } 
    throw new AppError(404, "Artist not exist");
};
