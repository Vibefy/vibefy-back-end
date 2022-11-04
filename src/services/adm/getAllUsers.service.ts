import AppDataSource from "../../data-source";
import Artist from "../../entities/artist.entity";
import User from "../../entities/user.entity";

export const getAllUsersService = async () => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();
  const artRepository = AppDataSource.getRepository(Artist);
  const arts = await artRepository.find();

  return {users, arts};
};
