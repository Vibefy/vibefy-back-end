import * as yup from "yup";
import { IArtistRequest, IArtistUpdate } from "../../interfaces/artist";

export const artistCreate: yup.SchemaOf<IArtistRequest> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  avatar_img: yup.string().notRequired(),
});
export const artistUpdate: yup.SchemaOf<IArtistUpdate> = yup.object().shape(
  {
    email: yup
      .string()
      .email()
      .when(["name", "password"], {
        is: (name: string, password: string) => {
          if (name || password) {
            return true;
          } else {
            return false;
          }
        },
        then: (schema) => schema.notRequired(),
        otherwise: (schema) => schema.required(),
      }),
    name: yup.string().when(["email", "password"], {
      is: (email: string, password: string) => {
        if (email || password) {
          return true;
        } else {
          return false;
        }
      },
      then: (schema) => schema.notRequired(),
      otherwise: (schema) => schema.required(),
    }),
    password: yup.string().when(["email", "name"], {
      is: (email: string, name: string) => {
        if (email || name) {
          return true;
        } else {
          return false;
        }
      },
      then: (schema) => schema.notRequired(),
      otherwise: (schema) => schema.required(),
    }),
  },
  [
    ["name", "password"],
    ["email", "password"],
    ["email", "name"],
  ]
);
