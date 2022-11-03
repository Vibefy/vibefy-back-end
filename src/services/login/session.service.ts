import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../../error/appError";
import AppDataSource from "../../data-source";
import User from "../../entities/user.entity";
import {IUserLogin}  from "../../interfaces/users";
import Artist from "../../entities/artist.entity";
import Adm from "../../entities/adm.entity";

export const sessionService = async ({ email, password }: IUserLogin) => {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();
    const artRepository = AppDataSource.getMongoRepository(Artist);
    const arts = await artRepository.find();
    const amdRepository = AppDataSource.getRepository(Adm);
    const adms = await amdRepository.find();
 
    const findUser = users.find((user) => user.email === email);
    const findUserArt = arts.find((user) => user.email === email);
    const findUserAdm = adms.find((user) => user.email === email);

    if (!findUser && !findUserArt && findUserAdm) {
      throw new AppError(403, "Wrong email/password")
    }
    let type = ""

    if(findUser){
      const passwordMatch = bcrypt.compareSync(password, findUser.password);
      
      if (!passwordMatch) {
        throw new AppError(403, "Wrong email/password")
      }

      type = "user"
    }else if(findUserArt){
      const passwordMatch = bcrypt.compareSync(password, findUserArt.password);
      
      if (!passwordMatch) {
        throw new AppError(403, "Wrong email/password")
      }

      type = "artist"
    }else {
      const passwordMatch = bcrypt.compareSync(password, findUserAdm.password);
      
      if (!passwordMatch) {
        throw new AppError(403, "Wrong email/password")
      }
      type = "adm"
    }

    const token = jwt.sign(
      { email: email, type: type},
      String(process.env.SECRET_KEY),
      { expiresIn: "24h", subject: findUser.id }
    );

    return { token };
};
