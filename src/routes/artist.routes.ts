import { Router } from "express";
import { deleteArtistController } from "../controllers/artist/artistDelet.controller";
import { artistUpdateController } from "../controllers/artist/artistUpdate.controller";
import { createArtistController } from "../controllers/artist/createArtist.controller";
import { getArtistController } from "../controllers/artist/getArtist.controller";
import { verifyAuthTokenMiddleware } from "../middleware/verifyAuthTokenMiddleware";

const artistRouter = Router();
artistRouter.post("", createArtistController);
artistRouter.get("/profile",verifyAuthTokenMiddleware, getArtistController)
artistRouter.patch("", verifyAuthTokenMiddleware, artistUpdateController);
artistRouter.delete("", verifyAuthTokenMiddleware, deleteArtistController);
export { artistRouter };
