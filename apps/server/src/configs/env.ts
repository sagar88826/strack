import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT || 8080,
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",

  NODE_ENV: process.env.NODE_ENV || "development",
};
