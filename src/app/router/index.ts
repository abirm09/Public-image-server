import express, { Router } from "express";
import { ImageRouter } from "../modules/image/image.routes";

type TModuleTypes = {
  path: string;
  route: Router;
};

const router = express();

const moduleRoutes: TModuleTypes[] = [
  {
    path: "/images",
    route: ImageRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
