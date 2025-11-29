import { createClient, RedisClientType } from 'redis';

let redisClient: RedisClientType | null = null;
let isConnecting = false;

export async function getRedisClient(): Promise<RedisClientType> {
  if (redisClient && redisClient.isOpen) {
    return redisClient;
  }

  // Create new client if it doesn't exist or is closed
  if (!redisClient || !redisClient.isOpen) {
    redisClient = createClient({
      username: process.env.REDIS_USERNAME || 'default',
      password: process.env.REDIS_PASSWORD || 'HFzm9uTTs87Bg8af20PQVmWJl7ggJ6G6',
      socket: {
        host: process.env.REDIS_HOST || 'redis-17065.c264.ap-south-1-1.ec2.cloud.redislabs.com',
        port: parseInt(process.env.REDIS_PORT || '17065', 10),
      },
    });

    redisClient.on('error', (err) => {
      console.error('Redis Client Error:', err);
    });

    redisClient.on('connect', () => {
      console.log('Redis Client Connecting...');
    });

    redisClient.on('ready', () => {
      console.log('Redis Client Connected');
    });

    redisClient.on('reconnecting', () => {
      console.log('Redis Client Reconnecting...');
    });
  }

  // Connect if not already connected
  if (!redisClient.isOpen && !isConnecting) {
    isConnecting = true;
    try {
      await redisClient.connect();
    } catch (error) {
      isConnecting = false;
      console.error('Error connecting to Redis:', error);
      throw error;
    }
    isConnecting = false;
  }

  return redisClient;
}

export async function closeRedisConnection(): Promise<void> {
  if (redisClient && redisClient.isOpen) {
    await redisClient.quit();
    redisClient = null;
  }
}
