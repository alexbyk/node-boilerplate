import { Service } from 'typedi';
import { EntityManager } from 'typeorm';
import Koa from 'koa';
import Router from 'koa-router';
import { UserService } from '@app/services/user';
import koaRouter from 'koa-router';
import koaBody from 'koa-bodyparser';
import koaHelmet from 'koa-helmet';
import koaCors from '@koa/cors';
import koaLogger from 'koa-logger';

@Service()
export class App {
  koa!: Koa;
  constructor(public userService: UserService) { }

  start(port: number | string) {
    const router = new Router();

    router.get('/users/:id', async (ctx, _) => {
      const user = await this.userService.getOne(ctx.params.id);
      if (!user) ctx.status = 404;
      ctx.body = user;
    });

    router.post('/users', async (ctx, _) => {
      console.log(ctx.body);
      //  const user = await this.userService.insert(ctx.params.id);
      //  if (!user) ctx.status = 404;
      //  ctx.body = user;
    });

    this.koa = (new Koa()).use(koaLogger()).use(koaBody()).use(router.routes());
    return this.listen(port);
  }

  private listen(port: number | string) {
    this.koa.listen(+port, () => {
      // tslint:disable-next-line
      console.log(`listening on port ${port}`);
    });
  }

}
