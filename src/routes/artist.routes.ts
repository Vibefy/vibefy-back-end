import { Router } from "express";

import { musicCreate } from "../schema/music";
import { IMusicCreate } from "../interfaces/artist/music";
import { artistCreate, artistUpdate } from "../schema/artist";
import { IArtistRequest, IArtistUpdate } from "../interfaces/artist";

import { addAvatarFile } from "../controllers/artist/addAvatarFile";
import { getArtistController } from "../controllers/artist/getArtist.controller";
import { getArtistByIdController } from "../controllers/adm/getArtistById.controller";
import { getAllArtistsController } from "../controllers/adm/getAllArtists.controller";
import { deleteArtistController } from "../controllers/artist/artistDelete.controller";
import { artistUpdateController } from "../controllers/artist/artistUpdate.controller";
import { createArtistController } from "../controllers/artist/createArtist.controller";
import { getIdMusicController } from "../controllers/artist/music/getIdMusic.controller";
import { createMusicController } from "../controllers/artist/music/createMusic.controller";
import { getAllMusicArtistController } from "../controllers/artist/music/getAllMusic.controller";

import { checkIdMiddleware } from "../middleware/checkIdMiddleware";
import { addMusicFilesAws } from "../controllers/artist/music/addMusicFilesAws";
import { verifyAuthAdminMiddleware } from "../middleware/verifyAuthAdminMiddleware";
import { verifyAuthTokenMiddleware } from "../middleware/verifyAuthTokenMiddleware";
import { verifyAuthArtistMiddleware } from "../middleware/verifyAuthArtistMiddleware";
import { schemaValidationMiddleware } from "../middleware/schemaValidation.middleware";
import { deleteArtistByIdController } from "../controllers/adm/deleteArtistById.controller";

const routes = Router();

export const artistRoutes = () => {
  routes.post(
    "",
    schemaValidationMiddleware<IArtistRequest>(artistCreate),
    createArtistController
  );
  routes.get(
    "/profile",
    verifyAuthTokenMiddleware,
    verifyAuthArtistMiddleware,
    getArtistController
  );
  routes.patch(
    "/profile",
    verifyAuthTokenMiddleware,
    verifyAuthArtistMiddleware,
    schemaValidationMiddleware<IArtistUpdate>(artistUpdate),
    artistUpdateController
  );
  routes.delete(
    "/profile",
    verifyAuthTokenMiddleware,
    verifyAuthArtistMiddleware,
    deleteArtistController
  );
  routes.post(
    "/music",
    verifyAuthTokenMiddleware,
    verifyAuthArtistMiddleware,
    schemaValidationMiddleware<IMusicCreate>(musicCreate),
    createMusicController
  );
  routes.get(
    "/music",
    verifyAuthTokenMiddleware,
    verifyAuthArtistMiddleware,
    getAllMusicArtistController
  );
  routes.get(
    "/music/:idMusic",
    verifyAuthTokenMiddleware,
    verifyAuthArtistMiddleware,
    getIdMusicController
  );
  routes.post(
    "/music/:id/files",
    verifyAuthTokenMiddleware,
    verifyAuthArtistMiddleware,
    checkIdMiddleware,
    addMusicFilesAws
  );

  routes.post(
    "/profile/avatar",
    verifyAuthTokenMiddleware,
    verifyAuthArtistMiddleware,
    addAvatarFile
  );

  //Only adm

  routes.get(
    "",
    verifyAuthTokenMiddleware,
    verifyAuthAdminMiddleware,
    getAllArtistsController
  );
  routes.get(
    "/:id",
    verifyAuthTokenMiddleware,
    verifyAuthAdminMiddleware,
    checkIdMiddleware,
    getArtistByIdController
  );

  routes.delete(
    "/:id",
    verifyAuthTokenMiddleware,
    verifyAuthAdminMiddleware,
    checkIdMiddleware,
    deleteArtistByIdController
  );

  return routes;
};
