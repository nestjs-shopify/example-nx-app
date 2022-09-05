import { EntityRepository } from '@mikro-orm/sqlite';
import { SessionEntity } from './session.entity';

export class SessionRepository extends EntityRepository<SessionEntity> {}
