import * as bcrypt from "bcryptjs";
import { AppError } from "../../error/appError";
import { AppDataSource } from "../../data-source";
import { IArtistUpdateRequest } from "../../interfaces/artist";
import Artist from "../../entities/artist.entity";

export const artistUpdateService = async ({
  id,
  name,
  email,
  password,
}: IArtistUpdateRequest) => {
  const artistRepository = AppDataSource.getRepository(Artist);
  const findUser = await artistRepository.findOneBy({ id });
  if (!findUser) {
    throw new AppError(404, "User not found");
  }
  if (name == undefined && email == undefined && password == undefined) {
    throw new AppError(401, "body empty");
  }

  const updateDate = new Date()

  artistRepository.update(findUser!.id, {
    name: name ? name : findUser.name,
    email: email ? email : findUser.email,
    password: password ? await bcrypt.hash(password, 10) : findUser.password,
    updated_At : updateDate
  });
  return true;
};
