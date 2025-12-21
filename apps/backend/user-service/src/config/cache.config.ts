import KeyvRedis from '@keyv/redis';
import { CacheModuleOptions } from '@nestjs/cache-manager';
import { registerAs } from "@nestjs/config";

export const CacheConfig = registerAs('cache', (): CacheModuleOptions => ({
    stores: [
        new KeyvRedis(`redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`),
    ],
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    ttl: 300,
}));
