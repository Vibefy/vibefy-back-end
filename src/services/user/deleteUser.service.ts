import { AppDataSource } from "../../data-source";
import User from "../../entities/user.entity";
import { AppError } from "../../error/appError";

export const deleteUserService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id });

  console.log(user);

  if (user!.isActive === false) {
    throw new AppError(400, "User is not active");
  }

  userRepository.update(user!.id, {
    isActive: false,
  });

  return true;
};
