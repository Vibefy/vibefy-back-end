import AppDataSource from "../../data-source";
import User from "../../entities/user.entity";
import { AppError } from "../../error/appError";


export const deleteUserService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();

  const findUser = users.find((user) => user.id === id);

  if (findUser.isActive !== true) {
    throw new AppError(400, "id Invalid");
  }

  userRepository.update(findUser!.id, {
    isActive: false,
  });

  return true;
};
