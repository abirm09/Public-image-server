import compression from "compression";
import cors, { CorsOptions } from "cors";
import express, { Application } from "express";
import helmet from "helmet";
import morgan from "morgan";
import config from "./app/config";
import globalErrorhandler from "./app/middlewares/globalErrorhandler";
import { notFoundRoute } from "./app/middlewares/notFoundRoute";
import { ImageController } from "./app/modules/image/image.controller";
import router from "./app/router";

const app: Application = express();

const corsOptions: CorsOptions = {
  origin: config.CLIENT_SIDE_DOMAINS?.split(","),
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type, Authorization",
};

if (config.ENV === "production") {
  app.set("trust proxy", 1);
}

// Middlewares
app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use(compression());
if (config.ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.redirect("https://www.abirmahmud.top");
});

// api endpoints
app.use("/api/v1", router);
app.use("/i/:slug", ImageController.getImageFIle);

// Global error handler
app.use(globalErrorhandler);

// handle not found route
app.use(notFoundRoute);

export default app;
