import express, { Router } from "express";

type TModuleTypes = {
  path: string;
  route: Router;
};

const router = express();

const moduleRoutes: TModuleTypes[] = [];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
