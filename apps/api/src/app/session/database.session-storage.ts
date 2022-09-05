import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, Logger } from '@nestjs/common';
import { SessionInterface } from '@shopify/shopify-api';
import { SessionStorage } from '@shopify/shopify-api/dist/auth/session';
import { SessionEntity } from './session.entity';
import { SessionRepository } from './session.repository';

@Injectable()
export class DatabaseSessionStorage implements SessionStorage {
  private readonly logger = new Logger('SessionStorage');

  constructor(
    @InjectRepository(SessionEntity) private readonly repo: SessionRepository
  ) {}

  async storeSession(session: SessionInterface): Promise<boolean> {
    const entity = this.repo.create(session);

    try {
      await this.repo.persistAndFlush(entity);
      return true;
    } catch (err) {
      this.logger.error(err);
    }

    return false;
  }

  async loadSession(id: string): Promise<SessionInterface> {
    return await this.repo.findOne(id);
  }

  async deleteSession(id: string): Promise<boolean> {
    try {
      const session = await this.repo.findOneOrFail(id);
      await this.repo.removeAndFlush(session);
      return true;
    } catch (err) {
      this.logger.error(err);
    }

    return false;
  }

  async deleteSessions?(ids: string[]): Promise<boolean> {
    const sessions = await this.repo.find(ids);
    sessions.forEach((s) => this.repo.remove(s));
    await this.repo.flush();

    return true;
  }

  async findSessionsByShop?(shop: string): Promise<SessionInterface[]> {
    const sessions = await this.repo.find({ shop });

    return sessions;
  }
}
