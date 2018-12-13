import { ENTITIES } from '@app/entity';
import { ConnectionOptions, createConnection } from 'typeorm';

// docker run -p 5432:5432 -e POSTGRES_DB=test postgres:alpine
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
