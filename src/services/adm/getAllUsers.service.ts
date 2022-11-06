import User from "../../entities/user.entity";
import { AppDataSource } from "../../data-source";
import Artist from "../../entities/artist.entity";
import { classToPlain } from "class-transformer";

export const getAllUsersService = async () => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const artRepository = AppDataSource.getRepository(Artist);

  const arts = await artRepository.find();

  const usersNopassorwd = classToPlain(users);
  const artsNopassorwd = classToPlain(arts);

  return { Users: usersNopassorwd, Artist: artsNopassorwd };
};
