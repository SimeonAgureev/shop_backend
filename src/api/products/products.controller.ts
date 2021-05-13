import Koa from 'koa';
import Router from 'koa-router';
import { getRepository, Repository } from 'typeorm';
import HttpStatus from 'http-status-codes';

import { Product as productEntity } from './products.entity'

const routerOpts: Router.IRouterOptions = {
  prefix: '/products',
};

const router: Router = new Router(routerOpts);

router.get('/', async (ctx: Koa.Context) => {
  const productRepo: Repository<productEntity> = getRepository(productEntity)
  const products = await productRepo.find();

  ctx.body = {
    products: products
  }
});

router.get('/:productId', async (ctx: Koa.Context) => {
  const productRepo: Repository<productEntity> = getRepository(productEntity)
  const product = await productRepo.findOne(ctx.params.productId);

  if (!product) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }

  // Respond with our product data.
  ctx.body = {
    product,
  };
});

router.post('/', async (ctx: Koa.Context) => {
  const productRepo: Repository<productEntity> = getRepository(productEntity);
  const { title, description, images } = ctx.request.body
  const product: productEntity = productRepo.create({
    title,
    description,
    images
  });

  await productRepo.save(product);

  ctx.body = {
    product,
  };
});

router.delete('/:productId', async (ctx: Koa.Context) => {
  const productRepo: Repository<productEntity> = getRepository(productEntity);

  const product = await productRepo.findOne(ctx.params.productId);

  if (!product) {
    ctx.body = {
      success: false
    }
    ctx.throw(HttpStatus.NOT_FOUND);
  }

  await productRepo.delete(product);

  ctx.status = HttpStatus.NO_CONTENT;
});

router.patch('/:productId', async (ctx: Koa.Context) => {
  const productRepo: Repository<productEntity> = getRepository(productEntity);

  const product: productEntity | undefined = await productRepo.findOne(ctx.params.productId);

  if (!product) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }

  const updatedproduct = await productRepo.merge(product, ctx.request.body);

  productRepo.save(updatedproduct);

  ctx.body = {
    data: { product: updatedproduct },
  };
});

export default router;