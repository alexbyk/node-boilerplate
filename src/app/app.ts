import { Service } from 'typedi';
import { EntityManager } from 'typeorm';
import Koa from 'koa';
import Router from 'koa-router';
import { UserService } from '@app/services/user';
import koaBody from 'koa-bodyparser';
import koaHelmet from 'koa-helmet';
import koaCors from '@koa/cors';
import koaLogger from 'koa-logger';
import { UsersController } from './users.controller';

@Service()
export class App {
  koa!: Koa;
  constructor(
    private ctrlUsers: UsersController,
  ) { }

  httpRoutes() {
    const router = new Router();
    router.get('/users/:id', this.ctrlUsers.getOne);
    router.post('/users', this.ctrlUsers.insert);
    return router.routes();
  }

  start(port: number | string) {
    this.koa = (new Koa()).use(koaLogger())
      .use(koaBody({}))
      .use(this.httpRoutes());

    return this.listen(port);
  }

  private listen(port: number | string) {
    this.koa.listen(+port, () => {
      // tslint:disable-next-line
      console.log(`listening on port ${port}`);
    });
  }

}
