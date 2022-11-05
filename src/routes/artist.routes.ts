import { Router } from "express";
import { createArtistController } from "../controllers/artist/createArtist.controller";

const artistRouter = Router();
artistRouter.post("", createArtistController);

export { artistRouter };
