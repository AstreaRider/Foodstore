const mongoose = require('mongoose')

const {dbHost, dbName, dbPort, dbUser, dbPass} = require('../app/config')

mongoose.connect(`mongodb://${dbHost}/${dbName}`, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true})

const db = mongoose.connection

module.exports = db