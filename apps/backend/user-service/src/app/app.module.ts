import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from '../config/database.config';
import { EnvConfig } from '../config/env.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   envFilePath: [
    //     '.env.development.local',
    //     '.env.development',
    //     '.env.production.local',
    //     '.env.production',
    //     '.env',
    //   ],
    //   isGlobal: true,
    //   cache: true,
    // }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'postgres',
    //     host: configService.get<string>('DATABASE_HOST'),
    //     port: configService.get<number>('DATABASE_PORT', 5432),
    //     username: configService.get<string>('DATABASE_USER'),
    //     password: configService.get<string>('DATABASE_PASSWORD'),
    //     database: configService.get<string>('DATABASE_NAME'),
    //     entities: [User],
    //     synchronize: configService.get<string>('NODE_ENV') === 'development',
    //     autoLoadEntities: true,
    //   }),
    //   inject: [ConfigService],
    // }),
    ConfigModule.forRoot({ load: [EnvConfig, DatabaseConfig], isGlobal: true, cache: true }),
    TypeOrmModule.forRootAsync(DatabaseConfig.asProvider()),
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
