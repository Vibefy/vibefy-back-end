import * as bcrypt from "bcryptjs";
import User from "../../entities/user.entity";
import { AppError } from "../../error/appError";
import { AppDataSource } from "../../data-source";
import { IUserUpdateParam } from "../../interfaces/users";

export const userUpdateService = async ({
  id,
  name,
  email,
  password,
}: IUserUpdateParam) => {
  const userRepository = AppDataSource.getRepository(User);
  const findUser = await userRepository.findOneBy({ id });

  if (!findUser) {
    throw new AppError(403, "Wrong email/password");
  }

  if (name == undefined && email == undefined && password == undefined) {
    throw new AppError(401, "body empty");
  }

  const updatedOn = new Date();

  userRepository.update(findUser!.id, {
    name: name ? name : findUser.name,
    email: email ? email : findUser.email,
    password: password ? await bcrypt.hash(password, 10) : findUser.password,
    updated_At: updatedOn,
  });

  return true;
};
