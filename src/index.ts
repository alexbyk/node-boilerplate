import 'tsconfig-paths/register';
import 'reflect-metadata';
import { Container, Inject, Service } from 'typedi';

import { createConnection, ConnectionOptions, EntityManager } from 'typeorm';
import { ENTITIES } from './entity';
import { App } from './app/app';

const dbOpts: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  logging: true,
  synchronize: true,
  entities: ENTITIES,
};

const PORT = process.env.PORT || '3000';

(async () => {
  const conn = await createConnection(dbOpts);
  Container.set(EntityManager, conn.manager);
  Container.get<App>(App).start(3000);
})();
