import AppDataSource from "../../data-source";
import User from "../../entities/user.entity";

export const getUsersService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id });

  return { ...user, password: undefined };
};
