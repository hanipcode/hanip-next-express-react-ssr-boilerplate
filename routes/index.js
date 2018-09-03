const user = require('./user');

function generateRouting(app) {
  app.use('/user', user);
}

module.exports = generateRouting;
