import { InjectRepository } from '@mikro-orm/nestjs';
import { SessionStorage } from '@nestjs-shopify/core';
import { Injectable, Logger } from '@nestjs/common';
import { SessionEntity } from './session.entity';
import { SessionRepository } from './session.repository';

@Injectable()
export class DatabaseSessionStorage implements SessionStorage {
  private readonly logger = new Logger('SessionStorage');

  constructor(
    @InjectRepository(SessionEntity) private readonly repo: SessionRepository
  ) {}

  async storeSession(session: SessionEntity): Promise<boolean> {
    let entity = await this.loadSession(session.id);
    if (!entity) {
      entity = this.repo.create(session);
    } else {
      entity = this.repo.assign(entity, session);
    }

    try {
      await this.repo.getEntityManager().persistAndFlush(entity);
      return true;
    } catch (err) {
      this.logger.error(err);
    }

    return false;
  }

  async loadSession(id: string): Promise<SessionEntity> {
    return await this.repo.findOne(id);
  }

  async deleteSession(id: string): Promise<boolean> {
    try {
      const session = await this.repo.findOneOrFail(id);
      await this.repo.getEntityManager().removeAndFlush(session);
      return true;
    } catch (err) {
      this.logger.error(err);
    }

    return false;
  }

  async deleteSessions(ids: string[]): Promise<boolean> {
    const em = this.repo.getEntityManager();
    const sessions = await this.repo.find(ids);
    sessions.forEach((s) => em.remove(s));
    await em.flush();

    return true;
  }

  async findSessionsByShop(shop: string): Promise<SessionEntity[]> {
    const sessions = await this.repo.find({ shop });

    return sessions;
  }
}
