import * as bcrypt from "bcryptjs";
import Adm from "../../entities/adm.entity";
import { AppError } from "../../error/appError";
import { AppDataSource } from "../../data-source";
import { IUserUpdateParamenst } from "../../interfaces/users";

export const userUpdateService = async ({
  id,
  name,
  email,
  password,
}: IUserUpdateParamenst) => {
  const admRepository = AppDataSource.getRepository(Adm);
  const findUser = await admRepository.findOneBy({ id });

  if (!findUser) {
    throw new AppError(403, "Wrong email/password");
  }

  if (name == undefined && email == undefined && password == undefined) {
    throw new AppError(401, "body empty");
  }

  admRepository.update(findUser!.id, {
    name: name ? name : findUser.name,
    email: email ? email : findUser.email,
    password: password ? await bcrypt.hash(password, 10) : findUser.password,
  });

  return true;
};
