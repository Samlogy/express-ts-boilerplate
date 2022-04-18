import mongoose from "mongoose";

import config from "../config";
import log from "../utils/logger";

const db = () => {
  return mongoose
    .connect(config.dbUri as string)
    .then(() => {
      log.info("MongoDB connected");
    })
    .catch((err: any) => {
      log.error("DB error", err.message);
      process.exit(1);
    });
};

export default db;
