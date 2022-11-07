import jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import Adm from "../../entities/adm.entity";
import User from "../../entities/user.entity";
import { AppError } from "../../error/appError";
import Artist from "../../entities/artist.entity";
import { AppDataSource } from "../../data-source";
import { IUserLogin } from "../../interfaces/users";

export const sessionService = async ({ email, password }: IUserLogin) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.findOne({
    where: { email },
  });
  const artRepository = AppDataSource.getRepository(Artist);
  const arts = await artRepository.findOne({
    where: { email },
  });
  const amdRepository = AppDataSource.getRepository(Adm);
  const adms = await amdRepository.findOne({
    where: { email },
  });

  if (!users && !arts && !adms) {
    throw new AppError(403, "Wrong e-mail/password");
  }
  let type = "";

  if (users) {
    type = "user";

    const passwordMatch = bcrypt.compareSync(password, users.password);

    if (!passwordMatch) {
      throw new AppError(403, "Wrong e-mail/password");
    }
    const token = jwt.sign(
      { email: email, type: type },
      String(process.env.SECRET_KEY),
      { expiresIn: "24h", subject: users.id }
    );
    return { token };
  } else if (arts) {
    type = "artist";
    const passwordMatch = bcrypt.compareSync(password, arts.password);

    if (!passwordMatch) {
      throw new AppError(403, "Wrong e-mail/password");
    }
    const token = jwt.sign(
      { email: email, type: type },
      String(process.env.SECRET_KEY),
      { expiresIn: "24h", subject: arts.id }
    );
    return { token };
  } else {
    type = "adm";
    const passwordMatch = bcrypt.compareSync(password, adms!.password);
    const token = jwt.sign(
      { email: email, type: type },
      String(process.env.SECRET_KEY),
      { expiresIn: "24h", subject: adms!.id }
    );

    if (!passwordMatch) {
      throw new AppError(403, "Wrong e-mail/password");
    }
    return { token };
  }
};
