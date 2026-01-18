import * as dotenv from "dotenv";

dotenv.config();

export type Config = {
  SENTRY_DSN: string;
};

export const getConfig = (): Config => {
  return {
    SENTRY_DSN: process.env.SENTRY_DSN || "",
  };
};
