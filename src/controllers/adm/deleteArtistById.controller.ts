import { Response, Request } from "express";
import { deleteArtistByIdService } from "../../services/adm/deleteArtistById.service";

export const deleteArtistByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;

  await deleteArtistByIdService(id)
  
  return res.status(204).send();
};
