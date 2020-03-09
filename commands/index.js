const server = require('./server')
const ext = require('./ext')
const job = require('./job')
const migration = require('./migration')

module.exports = plop => {
  server(plop)
  ext(plop)
  job(plop)
  migration(plop)
}
