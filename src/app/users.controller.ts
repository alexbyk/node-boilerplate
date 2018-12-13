import { Context } from 'koa';
import { UserService } from '@app/services/user';
import { Service } from 'typedi';

@Service()
export class UsersController {
  constructor(private userService: UserService) { }

  getOne = async (ctx: Context) => {
    const user = await this.userService.getOne(ctx.params.id);
    if (!user) ctx.status = 404;
    ctx.body = user;
  }

  insert = async (ctx: Context) => {
    const user = await this.userService.insert(ctx.request.body.name);
    if (!user) ctx.status = 404;
    ctx.body = user;
  }
}
