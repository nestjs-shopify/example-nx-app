import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { DatabaseSessionStorage } from './database.session-storage';
import { SessionEntity } from './session.entity';

@Module({
  imports: [MikroOrmModule.forFeature([SessionEntity])],
  providers: [DatabaseSessionStorage],
  exports: [DatabaseSessionStorage],
})
export class SessionModule {}
