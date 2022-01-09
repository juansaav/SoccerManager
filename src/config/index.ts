import dotenv from 'dotenv';

const dotEnv = dotenv.config();

if (dotEnv.error) {
  throw new Error("Couldn't find .env file.");
}

export default {
  // App port
  PORT: parseInt(process.env.PORT || "7000", 10),

  // THEMOVIEDB
  THEMOVIEDB_KEY: process.env.THEMOVIEDB_KEY || "TEST",

  // JWT
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_ALGORITHM: process.env.JWT_ALGORITHM,
};
