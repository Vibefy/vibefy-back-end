import User from "../../entities/user.entity";
import { AppError } from "../../error/appError";
import { AppDataSource } from "../../data-source";

export const deleteUserService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id });

  if (user!.isActive === false) {
    throw new AppError(400, "User has already been deleted or does not exist");
  }

  userRepository.update(user!.id, {
    isActive: false,
  });

  return true;
};
