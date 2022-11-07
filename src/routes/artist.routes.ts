import { Router } from "express";

import { artistCreate, artistUpdate } from "../schema/artist";
import { IArtistRequest, IArtistUpdate } from "../interfaces/artist";

import { getArtistController } from "../controllers/artist/getArtist.controller";
import { deleteArtistController } from "../controllers/artist/artistDelete.controller";
import { artistUpdateController } from "../controllers/artist/artistUpdate.controller";
import { createArtistController } from "../controllers/artist/createArtist.controller";

import { verifyAuthTokenMiddleware } from "../middleware/verifyAuthTokenMiddleware";
import { schemaValidationMiddleware } from "../middleware/schemaValidation.middleware";
import { verifyAuthArtistMiddleware } from "../middleware/verifyAuthArtistMiddleware";

const artistRouter = Router();
artistRouter.post(
  "",
  schemaValidationMiddleware<IArtistRequest>(artistCreate),
  createArtistController
);
artistRouter.get(
  "/profile",
  verifyAuthTokenMiddleware,
  verifyAuthArtistMiddleware,
  getArtistController
);
artistRouter.patch(
  "/profile",
  verifyAuthTokenMiddleware,
  verifyAuthArtistMiddleware,
  schemaValidationMiddleware<IArtistUpdate>(artistUpdate),
  artistUpdateController
);
artistRouter.delete(
  "/profile",
  verifyAuthTokenMiddleware,
  verifyAuthArtistMiddleware,
  deleteArtistController
);
export { artistRouter };
