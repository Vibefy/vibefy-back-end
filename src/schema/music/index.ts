import * as yup from "yup";
import { IMusicCreate } from "../../interfaces/artist/music";

export const musicCreate: yup.SchemaOf<IMusicCreate> = yup.object().shape({
  name: yup.string().required(),
  genre: yup.string().required(),
  description: yup.string().notRequired(),
  duration: yup.string().notRequired(),
});
