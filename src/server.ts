/* eslint-disable no-console */
process.on("uncaughtException", (error) => {
  console.log(
    "😴 `Uncaught exception` happened, exiting the process and  closing the server.",
    error
  );
  console.log(error);
  process.exit(1);
});

import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

let server: Server;
const bootstrap = async () => {
  try {
    await mongoose.connect(config.DBURL as string);
    console.log(`===${config.ENV}===`);
    console.log(`👌 Database is connected successfully.`);
    server = app.listen(config.PORT, () => {
      console.log(
        `😍 The server is running on http://localhost:${config.PORT}`
      );
    });
  } catch (error) {
    console.log(`❌ Can't connect to Database.`, error);
  }

  process.on("unhandledRejection", (error) => {
    console.log(`😴 Unhandled rejection happened. Exiting the process.`, error);
    if (server) {
      server.close(() => {
        process.exit(1);
      });
    }
    process.exit(1);
  });
};

bootstrap();
