import { AppDataSource } from "../../data-source";
import User from "../../entities/user.entity";
import {classToPlain} from "class-transformer"

export const getUsersService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    id,
  });

  return classToPlain(user);
};
