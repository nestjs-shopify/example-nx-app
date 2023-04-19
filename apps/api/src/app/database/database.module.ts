import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService
      ): Promise<TypeOrmModuleOptions> => {
        const slaves = [];
        const slaveServersStr = configService.get<string>('slave_servers');
        const slave = configService.get<Record<string, unknown>[]>(
          'mysql_slave_general'
        );
        const slaveServers = slaveServersStr.split(',');
        slaveServers.forEach((server) => {
          const one: Record<string, unknown> = { ...slave };
          one.host = server;

          slaves.push(one);
        });
        return {
          type: configService.get<string>('DATABASE_CONNECTION') as any,
          replication: {
            master: configService.get<Record<string, unknown>>('mysql_master'),
            slaves,
          },
          entities: [__dirname + './../entities/**.entity{.ts,.js}'],
          timezone: configService.get<string>('TIMEZONE') || '+07:00',
          synchronize: true,
          autoLoadEntities: true,
          logging: 'all',
          logger: 'advanced-console',
          charset: 'utf8mb4',
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
