import { Router } from "express";

import { musicCreate } from "../schema/music";
import { IMusicCreate } from "../interfaces/artist/music";
import { artistCreate, artistUpdate } from "../schema/artist";
import { IArtistRequest, IArtistUpdate } from "../interfaces/artist";

import { getArtistController } from "../controllers/artist/getArtist.controller";
import { deleteArtistController } from "../controllers/artist/artistDelete.controller";
import { artistUpdateController } from "../controllers/artist/artistUpdate.controller";
import { createArtistController } from "../controllers/artist/createArtist.controller";
import { getIdMusicController } from "../controllers/artist/music/getIdMusic.controller";
import { createMusicController } from "../controllers/artist/music/createMusic.controller";
import { getAllMusicArtistController } from "../controllers/artist/music/getAllMusic.controller";

import { verifyAuthTokenMiddleware } from "../middleware/verifyAuthTokenMiddleware";
import { schemaValidationMiddleware } from "../middleware/schemaValidation.middleware";
import { verifyAuthArtistMiddleware } from "../middleware/verifyAuthArtistMiddleware";
import { checkIdMiddleware } from "../middleware/checkIdMiddleware";
import { addAvatarFile } from "../controllers/artist/addAvatarFile";
import { addMusicFilesAws } from "../controllers/artist/music/addMusicFilesAws";
import { verifyAuthAdminMiddleware } from "../middleware/verifyAuthAdminMiddleware";
import { getAllArtistsController } from "../controllers/adm/getAllArtists.controller";
import { getArtistByIdController } from "../controllers/adm/getArtistById.controller";

export const artistRouter = Router();

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
  schemaValidationMiddleware<IMusicCreate>(musicCreate),
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

artistRouter.post(
  "/music/:id/files",
  verifyAuthTokenMiddleware,
  verifyAuthArtistMiddleware,
  checkIdMiddleware,
  addMusicFilesAws
);

artistRouter.post(
  "/profile/avatar",
  verifyAuthTokenMiddleware,
  verifyAuthArtistMiddleware,
  addAvatarFile
);

// Only Adm

artistRouter.get("",verifyAuthTokenMiddleware,verifyAuthAdminMiddleware,getAllArtistsController)
artistRouter.get("/:id",verifyAuthTokenMiddleware,verifyAuthAdminMiddleware,checkIdMiddleware,getArtistByIdController)
artistRouter.delete("/:id",verifyAuthTokenMiddleware,verifyAuthAdminMiddleware,checkIdMiddleware,deleteArtistController)

