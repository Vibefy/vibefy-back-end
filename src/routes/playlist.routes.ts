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

export const playlistRouter = Router();

playlistRouter.post(
  "",
  verifyAuthTokenMiddleware,
  verifyAuthAdminMiddleware,
  schemaValidationMiddleware<IPlaylistCreate>(playlistCreate),
  createPlaylistController
);
playlistRouter.post(
  "/:id/:id_music",
  verifyAuthTokenMiddleware,
  verifyAuthAdminMiddleware,
  addMusicPlaylistController
);
playlistRouter.get("", verifyAuthTokenMiddleware, listPlaylistController);
playlistRouter.get(
  "/:id",
  verifyAuthTokenMiddleware,
  verifyAuthAdminMiddleware,
  listMusicsPlaylistController
);
playlistRouter.delete(
  "/:id",
  verifyAuthTokenMiddleware,
  verifyAuthAdminMiddleware,
  deletePlaylistController
);
playlistRouter.delete(
  "/:id/:id_music",
  verifyAuthTokenMiddleware,
  verifyAuthAdminMiddleware,
  deleteMusicPlaylistController
);
