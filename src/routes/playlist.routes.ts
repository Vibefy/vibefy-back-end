import { Router } from "express";

import { playlistCreate } from "../schema/playlist";
import { IPlaylistCreate } from "../interfaces/playlist";

import { listPlaylistController } from "../controllers/playlist/listPlaylist.controller";
import { createPlaylistController } from "../controllers/playlist/createPlaylist.controller";
import { deletePlaylistController } from "../controllers/playlist/deletePlaylist.controller";
import { addMusicPlaylistController } from "../controllers/playlist/addMusicPlaylist.controller";
import { listMusicsPlaylistController } from "../controllers/playlist/listMusicsPlaylist.controller";
import { deleteMusicPlaylistController } from "../controllers/playlist/deleteMusicPlaylist.controller";

import { verifyAuthAdminMiddleware } from "../middleware/verifyAuthAdminMiddleware";
import { verifyAuthTokenMiddleware } from "../middleware/verifyAuthTokenMiddleware";
import { schemaValidationMiddleware } from "../middleware/schemaValidation.middleware";
import { checkIdMiddleware } from "../middleware/checkIdMiddleware";

const routes = Router();

export const playlistRoutes = () => {
  routes.post(
    "",
    verifyAuthTokenMiddleware,
    verifyAuthAdminMiddleware,
    schemaValidationMiddleware<IPlaylistCreate>(playlistCreate),
    createPlaylistController
  );

  routes.post(
    "/:id/:id_music",
    verifyAuthTokenMiddleware,
    verifyAuthAdminMiddleware,
    checkIdMiddleware,
    addMusicPlaylistController
  );

  routes.get("", verifyAuthTokenMiddleware, listPlaylistController);

  routes.get(
    "/:id",
    verifyAuthTokenMiddleware,
    verifyAuthAdminMiddleware,
    checkIdMiddleware,
    listMusicsPlaylistController
  );

  routes.delete(
    "/:id",
    verifyAuthTokenMiddleware,
    verifyAuthAdminMiddleware,
    checkIdMiddleware,
    deletePlaylistController
  );

  routes.delete(
    "/:id/:id_music",
    verifyAuthTokenMiddleware,
    verifyAuthAdminMiddleware,
    checkIdMiddleware,
    deleteMusicPlaylistController
  );

  return routes;
};