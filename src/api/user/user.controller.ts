import Koa from 'koa';
import Router from 'koa-router';
import { getRepository, Repository } from 'typeorm';
import HttpStatus from 'http-status-codes';

import { User as userEntity } from './user.entity'
import { UserRole } from '../../constants/Enums';

const routerOpts: Router.IRouterOptions = {
  prefix: '/user',
};

const router: Router = new Router(routerOpts);

router.get('/:userId', async (ctx: Koa.Context) => {
  const userRepo: Repository<userEntity> = getRepository(userEntity)
  const user = await userRepo.findOne(ctx.params.userId);

  if (!user) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }

  ctx.body = {
    user,
  };
});

router.post('/', async (ctx: Koa.Context) => {
  const userRepo: Repository<userEntity> = getRepository(userEntity);
  const { firstName, secondName, email } = ctx.request.body.firstName
  const user: userEntity = userRepo.create({
    firstName: firstName,
    secondName: secondName,
    email: email,
    role: UserRole.DEFAULT_USER
  });

  await userRepo.save(user);

  ctx.body = {
    user,
  };
});

router.patch('/:userId', async (ctx: Koa.Context) => {
  const userRepo: Repository<userEntity> = getRepository(userEntity);

  const user: userEntity | undefined = await userRepo.findOne(ctx.params.userId);

  if (!user) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }

  const updateduser = await userRepo.merge(user, ctx.request.body);

  userRepo.save(updateduser);

  ctx.body = {
    data: { user: updateduser },
  };
});

export default router;