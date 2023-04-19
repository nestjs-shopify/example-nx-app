import { Global, Module } from '@nestjs/common';
import RedisComponent from './redis.component';

@Global()
@Module({
  providers: [RedisComponent],
  exports: [RedisComponent],
})
export class ComponentModule {}
