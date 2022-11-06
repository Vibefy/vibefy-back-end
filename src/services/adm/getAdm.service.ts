import Adm from "../../entities/adm.entity";
import { AppDataSource } from "../../data-source";

export const getAdmService = async (id: string) => {
  const admRepository = AppDataSource.getRepository(Adm);

  const adm = await admRepository.findOneBy({ id });

  return adm;
};
