import * as yup from "yup";
import { IPlaylistCreate } from "../../interfaces/playlist";

export const playlistCreate: yup.SchemaOf<IPlaylistCreate> = yup
  .object()
  .shape({
    name: yup.string().required(),
  });
