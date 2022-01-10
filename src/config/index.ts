import dotenv from 'dotenv';

const dotEnv = dotenv.config();

if (dotEnv.error) {
  throw new Error("Couldn't find .env file.");
}

export default {
  // App port
  PORT: parseInt(process.env.PORT || "7000", 10),

  // JWT
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_ALGORITHM: process.env.JWT_ALGORITHM,

  // SYSTEM CONFIGURATIONS
  // This must be moved to the DB
  DEFAULT_COUNTRY: "US",

  TEAM_CONFIG: {
    Goalkeeper: 3,
    Defender: 6,
    Midfielder: 6,
    Attacker: 5,
  },

  INCREASE_PLAYER_VALUE: {
    min: 10,
    max: 100,
  },
};
