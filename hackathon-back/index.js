'use strict';

const app    = require('./src/server'),
      config = require('./config/config')


console.log(`app listen on port ${config.port}`);
app.listen(config.port);

