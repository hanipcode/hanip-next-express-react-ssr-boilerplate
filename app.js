// @flow
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const logger = require('./logger');
const setupDB = require('./database/db');
const generateRouting = require('./routes');
const swaggerSpec = require('./swaggerJsDocConfig');

const app = express();

const PORT = 8000;
setupDB();

// express route logging
app.use(morgan('dev'));

// bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

generateRouting(app);
app.listen(PORT, () => {
  logger.log('info', 'server is started', { PORT });
});
