import Redis from "ioredis";

export const createRedisClients = () => {
  const pubClient = new Redis();
  const subClient = new Redis();
  return { pubClient, subClient };
};
