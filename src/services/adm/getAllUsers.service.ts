import User from "../../entities/user.entity";
import { classToPlain } from "class-transformer";
import { AppDataSource } from "../../data-source";

export const getAllUsersService = async () => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find({relations : {playlist : true}});

  const usersNopassorwd = classToPlain(users);

  return usersNopassorwd;
};
