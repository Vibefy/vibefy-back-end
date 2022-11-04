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
    const users = await userRepository.findOneBy({email})
    const artRepository = AppDataSource.getRepository(Artist);
    const arts = await artRepository.findOneBy({email})
    const amdRepository = AppDataSource.getRepository(Adm);
    const adms = await amdRepository.findOneBy({email})

    if (!users && !arts && !adms) {
      throw new AppError(403, "Wrong email/password")
    }
    let type = ""

    if(users){
      type = "user"
      
      const passwordMatch = bcrypt.compareSync(password, users.password);
      
      if (!passwordMatch) {
        throw new AppError(403, "Wrong email/password")
      }
      const token = jwt.sign(
        { email: email, type: type},
        String(process.env.SECRET_KEY),
        { expiresIn: "24h", subject: users.id }
      )
      return {token}

    }else if(arts){
      type = "artist"
      const passwordMatch = bcrypt.compareSync(password, arts.password);
      
      if (!passwordMatch) {
        throw new AppError(403, "Wrong email/password")
      }
      const token = jwt.sign(
        { email: email, type: type},
        String(process.env.SECRET_KEY),
        { expiresIn: "24h", subject: arts.id }
      )
      return {token}

    }else {
      type = "adm"
      const passwordMatch = bcrypt.compareSync(password, adms.password);
      const token = jwt.sign(
        { email: email, type: type},
        String(process.env.SECRET_KEY),
        { expiresIn: "24h", subject: adms.id }
      )
      
        if (!passwordMatch) {
          throw new AppError(403, "Wrong email/password")
        }
      return { token };
    }
};
