import User from "../../entities/user.entity";
import { classToPlain } from "class-transformer";
import { AppDataSource } from "../../data-source";

export const getUsersService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    id,
  });

  return classToPlain(user);
};
