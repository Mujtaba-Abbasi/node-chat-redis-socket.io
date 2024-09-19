import env from "dotenv";

env.config();

const { PORT, REDIS_PORT, REDIS_HOST } = process.env;

export const config = {
  server: {
    PORT,
  },
  redis: {
    REDIS_PORT,
    REDIS_HOST,
    REDIS_URL: `redis://${REDIS_HOST}:${REDIS_PORT}`,
  },
};
