import { ENTITIES } from '@app/entity';
import { ConnectionOptions, createConnection } from 'typeorm';

export async function getTestConnection() {
  const dbOpts: ConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'postgres',
    database: 'test',
    // logging: true,
    synchronize: true,
    entities: ENTITIES,
  };

  const conn = await createConnection(dbOpts);
  return conn;
}
