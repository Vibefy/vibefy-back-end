import { Router } from "express";
import { addMusicPlaylistController } from "../controllers/playlist/addMusicPlaylist.controller";
import { createPlaylistController } from "../controllers/playlist/createPlaylist.controller";
import { deleteMusicPlaylistController } from "../controllers/playlist/deleteMusicPlaylist.controller";
import { deletePlaylistController } from "../controllers/playlist/deletePlaylist.controller";
import { listMusicPlaylistController } from "../controllers/playlist/listMusicPlaylist.controller";
import { listPlaylistController } from "../controllers/playlist/listPlaylist.controller";
import { verifyAuthAdminMiddleware } from "../middleware/verifyAuthAdminMiddleware";
import { verifyAuthTokenMiddleware } from "../middleware/verifyAuthTokenMiddleware";

const playlistRoute = Router();

playlistRoute.post(
  "",
  verifyAuthTokenMiddleware,
  verifyAuthAdminMiddleware,
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
