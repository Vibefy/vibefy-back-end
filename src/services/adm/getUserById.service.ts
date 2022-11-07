import User from "../../entities/user.entity";
import { AppError } from "../../error/appError";
import { classToPlain } from "class-transformer";
import { AppDataSource } from "../../data-source";
import Artist from "../../entities/artist.entity";

export const getUserByIdService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id });
  if (user) {
    return classToPlain(user);
  } else {
    const artRepository = AppDataSource.getRepository(Artist);

    const arts = await artRepository.findOneBy({ id });

    if (arts) {
      return classToPlain(arts);
    } else {
      throw new AppError(404, "User not exist");
    }
  }
};
