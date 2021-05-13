import Koa from 'koa';
import Router from 'koa-router';
import { getRepository, Repository } from 'typeorm';
import HttpStatus from 'http-status-codes';

import { Brand as brandEntity } from './brand.entity'

const routerOpts: Router.IRouterOptions = {
  prefix: '/brand',
};

const router: Router = new Router(routerOpts);

router.get('/', async (ctx: Koa.Context) => {
  const brandRepo: Repository<brandEntity> = getRepository(brandEntity)
  const brands = await brandRepo.find();

  ctx.body = {
    brands: brands
  }
});

router.get('/:brandId', async (ctx: Koa.Context) => {
  const brandRepo: Repository<brandEntity> = getRepository(brandEntity)
  const brand = await brandRepo.findOne(ctx.params.brandId);

  if (!brand) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }

  // Respond with our brand data.
  ctx.body = {
    brand,
  };
});

router.post('/', async (ctx: Koa.Context) => {
  const brandRepo: Repository<brandEntity> = getRepository(brandEntity);
  const brand: brandEntity = brandRepo.create({
    name: ctx.request.body.name
  });

  await brandRepo.save(brand);

  ctx.body = {
    brand,
  };
});

router.delete('/:brandId', async (ctx: Koa.Context) => {
  const brandRepo: Repository<brandEntity> = getRepository(brandEntity);

  const brand = await brandRepo.findOne(ctx.params.brandId);

  if (!brand) {
    ctx.body = {
      success: false
    }
    ctx.throw(HttpStatus.NOT_FOUND);
  }

  await brandRepo.delete(brand);

  ctx.status = HttpStatus.NO_CONTENT;
});

router.patch('/:brandId', async (ctx: Koa.Context) => {
  const brandRepo: Repository<brandEntity> = getRepository(brandEntity);

  const brand: brandEntity | undefined = await brandRepo.findOne(ctx.params.brandId);

  if (!brand) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }

  const updatedbrand = await brandRepo.merge(brand, ctx.request.body);

  brandRepo.save(updatedbrand);

  ctx.body = {
    data: { brand: updatedbrand },
  };
});

export default router;