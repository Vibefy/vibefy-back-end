import { Router } from "express";
import { deleteArtistController } from "../controllers/artist/artistDelete.controller";
import { artistUpdateController } from "../controllers/artist/artistUpdate.controller";
import { createArtistController } from "../controllers/artist/createArtist.controller";
import { getArtistController } from "../controllers/artist/getArtist.controller";
import { IArtistRequest, IArtistUpdate } from "../interfaces/artist";
import { schemaValidationMiddleware } from "../middleware/schemaValidation.middleware";
import { verifyAuthTokenMiddleware } from "../middleware/verifyAuthTokenMiddleware";
import { artistCreate, artistUpdate } from "../schema/artist";

const artistRouter = Router();
artistRouter.post("",schemaValidationMiddleware<IArtistRequest>(artistCreate),createArtistController);
artistRouter.get("/profile",verifyAuthTokenMiddleware, getArtistController)
artistRouter.patch("", verifyAuthTokenMiddleware,schemaValidationMiddleware<IArtistUpdate>(artistUpdate),artistUpdateController);
artistRouter.delete("", verifyAuthTokenMiddleware, deleteArtistController);
export { artistRouter };
