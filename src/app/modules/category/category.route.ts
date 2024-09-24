import { Router } from "express";
import authGuard from "../../middlewares/authGuard";
import { CategoryController } from "./category.controller";

const route = Router();

route.post("/", authGuard(), CategoryController.createCategory);

export const CategoryRouter = route;
