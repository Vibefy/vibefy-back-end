import * as bcrypt from "bcryptjs";
import AppDataSource from "../../data-source";
import Adm from "../../entities/adm.entity";
import Artist from "../../entities/artist.entity";
import User from "../../entities/user.entity";
import { AppError } from "../../error/appError";
import { IUserRequest } from "../../interfaces/users";

export const createUserService = async ({
  name,
  email,
  password,
}: IUserRequest) => {
  const userRepository = AppDataSource.getRepository(User)
  const users = await userRepository.findOneBy({email})
  const artRepository = AppDataSource.getRepository(Artist)
  const arts = await artRepository.findOneBy({email})
  const amdRepository = AppDataSource.getRepository(Adm)
  const adms = await amdRepository.findOneBy({email})

  if (users || arts || adms) {
    throw new AppError(403, "Email already exists");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = new User();
  user.name = name;
  user.email = email;
  user.password = passwordHash;
  user.payment = null
  user.playlist = [];
  user.created_At = new Date()
  user.updated_At = new Date()


  userRepository.create(user);
  await userRepository.save(user);

  return { ...user, password: undefined };
};
