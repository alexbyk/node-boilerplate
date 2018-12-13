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
    synchronize: false,
    entities: ENTITIES,
  };

  const conn = await createConnection(dbOpts);
  await conn.query(`
DO $do$ BEGIN
   IF EXISTS (SELECT 1 FROM pg_database WHERE datname = 'test') THEN
      RAISE NOTICE 'Database already exists';
   ELSE
      CREATE DATABASE test;
   END IF;
END $do$;
  `);

  await conn.synchronize();
  return conn;
}
