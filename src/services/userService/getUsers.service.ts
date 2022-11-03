import AppDataSource from "../../data-source";
import User from "../../entities/user.entity";

export const getUsersService= async (id : string) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.find({
    where: {
      id: id
    }
  });
  
  return {...user, password: undefined}
};


