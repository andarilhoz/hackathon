'use strict'

const db = require('mongoose'),
	      config = require('../../config/config')
      
db.Promise = require('bluebird');

db.connect(`mongodb://${config.mongo.host}/${config.mongo.database}`)

module.export = db.connection




