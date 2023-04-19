import { Module } from '@nestjs/common';
import { DatabaseSessionStorage } from './database.session-storage';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionEntity } from '../../entities/session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SessionEntity])],
  providers: [DatabaseSessionStorage],
  exports: [DatabaseSessionStorage],
})
export class SessionModule {}
