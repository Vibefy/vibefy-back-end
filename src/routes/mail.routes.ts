import { Router } from "express";

import { mailController } from "../controllers/mail.controller";

const routes = Router();

export const mailRoutes = () => {
  routes.get("", mailController);

  return routes;
};
