import User from "../../entities/user.entity";
import { AppDataSource } from "../../data-source";
import Artist from "../../entities/artist.entity";
import { AppError } from "../../error/appError";

export const deleteUserByIdService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id });

  if (user) {
      if(user.isActive === false)
      {
        throw new AppError(400, "user is not active");
      }
    userRepository.update(user!.id, {
      isActive: false,
    });

    return true;
  } else {
    const artRepository = AppDataSource.getRepository(Artist);

    const arts = await artRepository.findOneBy({ id });

    if (arts) {
        if(arts.isActive === false)
        {
          throw new AppError(400, "artist is not active");
        }
      artRepository.update(arts!.id, {
        isActive: false,
      });

      return true;
    } else {
      throw new AppError(404, "User not exist");
    }
  }
};
