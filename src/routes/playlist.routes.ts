import { Router } from "express";
import { addMusicPlaylistController } from "../controllers/playlist/addMusicPlaylist.controller";
import { createPlaylistController } from "../controllers/playlist/createPlaylist.controller";
import { deleteMusicPlaylistController } from "../controllers/playlist/deleteMusicPlaylist.controller";
import { deletePlaylistController } from "../controllers/playlist/deletePlaylist.controller";
import { listMusicPlaylistController } from "../controllers/playlist/listMusicPlaylist.controller";
import { listPlaylistController } from "../controllers/playlist/listPlaylist.controller";
import { IPlaylistCreate } from "../interfaces/playlist";
import { schemaValidationMiddleware } from "../middleware/schemaValidation.middleware";
import { verifyAuthAdminMiddleware } from "../middleware/verifyAuthAdminMiddleware";
import { verifyAuthTokenMiddleware } from "../middleware/verifyAuthTokenMiddleware";
import { playlistCreate } from "../schema/playlist";

const playlistRoute = Router();

playlistRoute.post(
  "",
  verifyAuthTokenMiddleware,
  verifyAuthAdminMiddleware,
  schemaValidationMiddleware<IPlaylistCreate>(playlistCreate),
  createPlaylistController
);
playlistRoute.post(
  "/:id",
  verifyAuthTokenMiddleware,
  verifyAuthAdminMiddleware,
  addMusicPlaylistController
);
playlistRoute.get("", verifyAuthTokenMiddleware, listPlaylistController);
playlistRoute.get(
  "/:id",
  verifyAuthTokenMiddleware,
  verifyAuthAdminMiddleware,
  listMusicPlaylistController
);
playlistRoute.delete(
  "/:id",
  verifyAuthTokenMiddleware,
  verifyAuthAdminMiddleware,
  deletePlaylistController
);
playlistRoute.delete(
  "/:id",
  verifyAuthTokenMiddleware,
  verifyAuthAdminMiddleware,
  deleteMusicPlaylistController
);

export { playlistRoute };
