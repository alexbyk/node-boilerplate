import 'reflect-metadata';
import 'tsconfig-paths/register';

import { createConnection, ConnectionOptions } from 'typeorm';
import { ENTITIES } from './entity';

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

// const di = new Di();
// di.set(Db, new Db(dbOpts));
// const app = new App(di);

// tslint:disable:no-console
(async () => {
  const conn = await createConnection(dbOpts);
  // await app.listenPromise(+PORT);
  console.log(`Listening on ${PORT}`);
})();
