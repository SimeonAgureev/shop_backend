import Koa from 'koa';
import Router from 'koa-router';
import { getRepository, Repository } from 'typeorm';
import HttpStatus from 'http-status-codes';

import { Category as categoryEntity } from './categories.entity'

const routerOpts: Router.IRouterOptions = {
  prefix: '/categories',
};

const router: Router = new Router(routerOpts);

router.get('/', async (ctx: Koa.Context) => {
  const categoryRepo: Repository<categoryEntity> = getRepository(categoryEntity)
  const categories = await categoryRepo.find();

  ctx.body = {
    categories: categories
  }
});

router.get('/:categoryId', async (ctx: Koa.Context) => {
  const categoryRepo: Repository<categoryEntity> = getRepository(categoryEntity)
  const category = await categoryRepo.findOne(ctx.params.categoryId);

  if (!category) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }

  // Respond with our category data.
  ctx.body = {
    category,
  };
});

router.post('/', async (ctx: Koa.Context) => {
  const categoryRepo: Repository<categoryEntity> = getRepository(categoryEntity);
  const category: categoryEntity = categoryRepo.create({
    name: ctx.request.body.name
  });

  await categoryRepo.save(category);

  ctx.body = {
    category,
  };
});

router.delete('/:categoryId', async (ctx: Koa.Context) => {
  const categoryRepo: Repository<categoryEntity> = getRepository(categoryEntity);

  const category = await categoryRepo.findOne(ctx.params.categoryId);

  if (!category) {
    ctx.body = {
      success: false
    }
    ctx.throw(HttpStatus.NOT_FOUND);
  }

  await categoryRepo.delete(category);

  ctx.status = HttpStatus.NO_CONTENT;
});

router.patch('/:categoryId', async (ctx: Koa.Context) => {
  const categoryRepo: Repository<categoryEntity> = getRepository(categoryEntity);

  const category: categoryEntity | undefined = await categoryRepo.findOne(ctx.params.categoryId);

  if (!category) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }

  const updatedcategory = await categoryRepo.merge(category, ctx.request.body);

  categoryRepo.save(updatedcategory);

  ctx.body = {
    data: { category: updatedcategory },
  };
});

export default router;