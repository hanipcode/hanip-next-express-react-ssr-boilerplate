const mongoose = require('mongoose');

// may add additional config later
function setupDB() {
  mongoose.connect('mongodb://localhost/ikan_db');
}

module.exports = setupDB;
