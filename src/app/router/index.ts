import express, { Router } from "express";
import { CategoryRouter } from "../modules/category/category.route";
import { ImageRouter } from "../modules/image/image.routes";

type TModuleTypes = {
  path: string;
  route: Router;
};

const router = express();

/*
 The `moduleRoutes` constant is an array of objects where each object represents a module type. Each
object has two properties: `path` which is a string representing the route path, and `route` which
is the router associated with that path.
*/
const moduleRoutes: TModuleTypes[] = [
  {
    path: "/images",
    route: ImageRouter,
  },
  {
    path: "/category",
    route: CategoryRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
