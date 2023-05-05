import { In, Repository } from 'typeorm';

import { SessionStorage } from '@nestjs-shopify/core';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { SessionEntity } from '../../entities/session.entity';

@Injectable()
export class DatabaseSessionStorage implements SessionStorage {
  private readonly logger = new Logger('SessionStorage');

  constructor(
    @InjectRepository(SessionEntity)
    private readonly repo: Repository<SessionEntity>
  ) {}

  async storeSession(session: SessionEntity): Promise<boolean> {
    try {
      let entity = await this.loadSession(session.id);
      if (!entity) {
        entity = await this.repo.save(session);
      } else {
        await this.repo.update(entity.id, session);
      }
      return true;
    } catch (err) {
      this.logger.error(err);
    }

    return false;
  }

  async loadSession(id: string): Promise<SessionEntity> {
    return await this.repo.findOneBy({ id: id });
  }

  async deleteSession(id: string): Promise<boolean> {
    try {
      const session = await this.repo.findOneBy({ id });
      void (await this.repo.delete(session.id));
      return true;
    } catch (err) {
      this.logger.error(err);
    }

    return false;
  }

  async deleteSessions(ids: string[]): Promise<boolean> {
    // const sessions = await this.repo.find({ where: { id: In(ids) } });
    // sessions.forEach((s) => this.repo.remove(s));
    void (await this.repo.delete({ id: In(ids) }));

    return true;
  }

  async findSessionsByShop(shop: string): Promise<SessionEntity[]> {
    const sessions = await this.repo.find({ where: { shop } });

    return sessions;
  }
}
