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
  database: 'test',
  logging: true,
  synchronize: true,
  entities: ENTITIES,
};

const PORT = process.env.PORT || '3000';

// const di = new Di();
// di.set(Db, new Db(dbOpts));
// const app = new App(di);

// tslint:disable:no-console
(async () => {
  const conn = await createConnection(dbOpts);
  Container.set(EntityManager, conn.manager);
  console.log(`Listening on ${PORT}`);
})();
