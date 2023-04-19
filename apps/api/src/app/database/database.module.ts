import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService
      ): Promise<TypeOrmModuleOptions> => ({
        type: configService.get<string>('DATABASE_CONNECTION') as any,
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_DB_NAME'),
        entities: [__dirname + './../entities/**.entity{.ts,.js}'],
        timezone: configService.get<string>('TIMEZONE') || '+07:00',
        synchronize: true,
        autoLoadEntities: true,
        logging: 'all',
        logger: 'advanced-console',
        charset: "utf8mb4",
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
