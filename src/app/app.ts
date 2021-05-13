import Koa from 'koa';
import HttpStatus from 'http-status-codes';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import serve from 'koa-static';

import categoriesController from '../api/categories/categories.controller'
import brandController from '../api/brand/brand.controller'
import productsController from '../api/products/products.controller'

const app: Koa = new Koa();
app.use(serve('public'));
app.use(logger());
app.use(bodyParser());

app.use(categoriesController.routes());
app.use(brandController.routes())
app.use(productsController.routes())
app.use(categoriesController.allowedMethods());

// Generic error handling middleware.
app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
  try {
    await next();
  } catch (error) {
    ctx.status = error.statusCode || error.status || HttpStatus.INTERNAL_SERVER_ERROR;
    error.status = ctx.status;
    ctx.body = { error };
    ctx.app.emit('error', error, ctx);
  }
});

// Initial route
app.use(async (ctx: Koa.Context) => {
  ctx.body = 'Hello world';
});

// Application error logging.
app.on('error', console.error);

export default app;