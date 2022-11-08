import { Router } from "express";

import { artistCreate, artistUpdate } from "../schema/artist";

import { getArtistController } from "../controllers/artist/getArtist.controller";
import { deleteArtistController } from "../controllers/artist/artistDelete.controller";
import { artistUpdateController } from "../controllers/artist/artistUpdate.controller";
import { createArtistController } from "../controllers/artist/createArtist.controller";

import { createMusicController } from "../controllers/artist/music/createMusic.controller";
import { getAllMusicArtistController } from "../controllers/artist/music/getAllMusic.controller";
import { getIdMusicController } from "../controllers/artist/music/getIdMusic.controller";
import { IArtistRequest, IArtistUpdate } from "../interfaces/artist";

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
artistRouter.post(
  "/music",
  verifyAuthTokenMiddleware,
  verifyAuthArtistMiddleware,
  createMusicController
);
artistRouter.get(
  "/music",
  verifyAuthTokenMiddleware,
  verifyAuthArtistMiddleware,
  getAllMusicArtistController
);
artistRouter.get(
  "/music/:idMusic",
  verifyAuthTokenMiddleware,
  verifyAuthArtistMiddleware,
  getIdMusicController
);

export { artistRouter };
