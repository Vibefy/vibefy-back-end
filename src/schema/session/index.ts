import * as yup from "yup";
import { ILogin } from "../../interfaces/session";

export const login: yup.SchemaOf<ILogin> = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
});
