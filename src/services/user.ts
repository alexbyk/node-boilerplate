import { Service } from 'typedi';
import { EntityManager } from 'typeorm';
import { User } from '@app/entity/user';

@Service()
export class UserService {
  constructor(public manager: EntityManager) { }

  async insert(name: string): Promise<User> {
    return (await this.manager.query(`insert into "user" (name) values($1) returning *`, [name]))[0];
  }

  async getOne(id: string) { return await this.manager.findOne(User, id); }
}
