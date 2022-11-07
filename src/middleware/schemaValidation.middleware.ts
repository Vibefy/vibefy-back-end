import { SchemaOf, ValidationError } from "yup";
import { NextFunction, Response, Request } from "express";

export function schemaValidationMiddleware<T>(schema: SchemaOf<T>) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      await schema.validate(data, { abortEarly: false, stripUnknown: true });
      next();
    } catch (err) {
      if (err instanceof ValidationError) {
        const { errors } = err;

        return res.status(400).json({ message: errors });
      }
    }
  };
}
