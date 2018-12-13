import { ContainerInstance } from 'typedi';
import { Connection, EntityManager } from 'typeorm';
import { getTestConnection } from '@app/test/connection';
import { UserService } from './user';

let container: ContainerInstance;
let connection: Connection;
let service: UserService;

beforeAll(async () => {
  try { connection = await getTestConnection(); } catch (e) {
    // tslint:disable-next-line
    throw e;
  }
});

beforeEach(async () => {
  container = new ContainerInstance('test');
  container.set(EntityManager, connection.manager);
  service = container.get(UserService);
  await connection.manager.query(`TRUNCATE TABLE "user" RESTART IDENTITY CASCADE;`);
});

test('create/get', async () => {
  const user = await service.insert('First');
  expect(user.id).toBe('1');
  expect(await service.getOne('1')).toMatchObject({ id: '1', name: 'First' });
});

afterAll(() => { if (connection) connection.close(); });
