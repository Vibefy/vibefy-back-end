import * as bcrypt from "bcryptjs";
import Adm from "../../entities/adm.entity";
import { AppError } from "../../error/appError";
import { AppDataSource } from "../../data-source";
import { IUserUpdateParam } from "../../interfaces/users";

export const admUpdateService = async ({
  id,
  name,
  email,
  password,
}: IUserUpdateParam) => {
  const admRepository = AppDataSource.getRepository(Adm);
  const findAdm = await admRepository.findOneBy({id})

  if (name == undefined && email == undefined && password == undefined) {
    throw new AppError(400, "body empty");
  }

  admRepository.update(findAdm,{
    name: name ? name : findAdm.name,
    email: email ? email : findAdm.email,
    password: password ? await bcrypt.hash(password, 10) : findAdm.password,
  });

  return true;
};
