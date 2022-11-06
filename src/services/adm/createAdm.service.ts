import * as bcrypt from "bcryptjs";
import Adm from "../../entities/adm.entity";
import User from "../../entities/user.entity";
import { AppError } from "../../error/appError";
import { AppDataSource } from "../../data-source";
import Artist from "../../entities/artist.entity";
import { IAdmRequest } from "../../interfaces/adm";

export const createAdmService = async ({
  name,
  email,
  password,
  admHash,
}: IAdmRequest) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.findOneBy({ email });
  const artRepository = AppDataSource.getRepository(Artist);
  const arts = await artRepository.findOneBy({ email });
  const amdRepository = AppDataSource.getRepository(Adm);
  const adms = await amdRepository.findOneBy({ email });

  if (users || arts || adms) {
    throw new AppError(403, "Email already exists");
  }

  if (name == undefined || email == undefined || password == undefined) {
    throw new AppError(400, "Field is required");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  if (admHash !== process.env.ADM_HASH) {
    throw new AppError(401, "Secrect key invalid");
  }

  const adm = new Adm();
  adm.name = name;
  adm.email = email;
  adm.password = passwordHash;

  amdRepository.create(adm);
  await amdRepository.save(adm);

  return { ...adm, password: undefined };
};
