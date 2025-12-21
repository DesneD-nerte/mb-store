import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheConfig } from '../config/cache.config';
import { DatabaseConfig } from '../config/database.config';
import { EnvConfig } from '../config/env.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [EnvConfig, DatabaseConfig, CacheConfig], isGlobal: true, cache: true }),
    TypeOrmModule.forRootAsync(DatabaseConfig.asProvider()),
    CacheModule.registerAsync(CacheConfig.asProvider()),
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
