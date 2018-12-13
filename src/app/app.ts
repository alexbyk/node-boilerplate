import { Service } from 'typedi';
import Koa from 'koa';
import Router from 'koa-router';
import koaBody from 'koa-bodyparser';
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
