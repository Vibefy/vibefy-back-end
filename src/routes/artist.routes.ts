import { Router } from "express";
import { createArtistController } from "../controllers/artist/createArtist.controller";
import { getArtistController } from "../controllers/artist/getArtist.controller";
import { verifyAuthTokenMiddleware } from "../middleware/verifyAuthTokenMiddleware";

const artistRouter = Router();
artistRouter.post("", createArtistController);
artistRouter.get("/profile",verifyAuthTokenMiddleware, getArtistController)
export { artistRouter };
