import compression from "compression";
import express, { Application } from "express";
import helmet from "helmet";
import morgan from "morgan";
import config from "./app/config";
import globalErrorhandler from "./app/middlewares/globalErrorhandler";
import { notFoundRoute } from "./app/middlewares/notFoundRoute";
import router from "./app/router";
const app: Application = express();

if (config.ENV === "production") {
  app.set("trust proxy", 1);
}

// Middlewares
app.use(helmet());
app.use(express.json());
app.use(compression());
if (config.ENV === "development") {
  app.use(morgan("dev"));
}

// Root route
app.get("/", (req, res) => {
  res.send(["ok"]);
});

// api endpoints
app.use("/api/v1", router);

// Global error handler
app.use(globalErrorhandler);

// handle not found route
app.use(notFoundRoute);

export default app;
