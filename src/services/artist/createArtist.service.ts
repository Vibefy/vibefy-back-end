import * as bcrypt from "bcryptjs";
import Adm from "../../entities/adm.entity";
import User from "../../entities/user.entity";
import { AppError } from "../../error/appError";
import { classToPlain } from "class-transformer";
import Artist from "../../entities/artist.entity";
import { AppDataSource } from "../../data-source";
import { IArtistRequest } from "../../interfaces/artist";

export const createArtistService = async ({
  name,
  email,
  password,
}:IArtistRequest) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.findOneBy({ email });
  const artRepository = AppDataSource.getRepository(Artist);
  const arts = await artRepository.findOneBy({ email });
  const amdRepository = AppDataSource.getRepository(Adm);
  const adms = await amdRepository.findOneBy({ email });

  if (users || arts || adms) {
    throw new AppError(403, "E-mail already exists");
  }

  if (name == undefined || email == undefined || password == undefined) {
    throw new AppError(400, "Required fields not filled");
  }
  const passwordHash = await bcrypt.hash(password, 10);
 
  const artist = new Artist();
  artist.name = name;
  artist.email = email;
  artist.password = passwordHash;
  artist.created_At = new Date();
  artist.updated_At = new Date();

   artRepository.create(artist);
  await artRepository.save(artist);

  const artistSerialized = classToPlain(artist);
  return artistSerialized;
};
