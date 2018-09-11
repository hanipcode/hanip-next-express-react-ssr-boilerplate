// @flow

// prepare env config
require('dotenv').config();

const express = require('express');
const next = require('next');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const compression = require('compression');
const CacheRenderer = require('./cacheRender');
const logger = require('./logger');
const setupDB = require('./server/database/db');
const apiRouter = require('./server/routes');
const swaggerSpec = require('./swaggerJsDocConfig');
const setupPassport = require('./server/passport');

const server = express();
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const { PORT } = process.env;

setupDB();
setupPassport();

// init next js app;
app.prepare().then(() => {
  // express route logging
  const cacheRenderer = new CacheRenderer(app);
  if (process.env.NODE_ENV !== 'production') {
    server.use(morgan('dev'));
  }

  // compression
  server.use(compression());
  // bodyparser
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());
  server.use(express.static('static'));
  server.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  server.use('/api/v1', apiRouter);
  server.listen(PORT, () => {
    logger.log('info', 'server is started', { PORT });
  });

  // next js routing
  server.get('/login', (req: Request, res: Response) => cacheRenderer.cacheRender(req, res, '/login', req.query));
  server.get('/register', (req: Request, res: Response) => cacheRenderer.cacheRender(req, res, '/register', req.query));
  server.get('/home', (req: Request, res: Response) => cacheRenderer.cacheRender(req, res, '/home', req.query));
  server.get('/profile', (req: Request, res: Response) => cacheRenderer.cacheRender(req, res, '/profile', req.query));
  server.get('/profile/edit', (req: Request, res: Response) => cacheRenderer.cacheRender(req, res, '/editProfile', req.query));
  server.get('*', (req, res) => handle(req, res));
});
