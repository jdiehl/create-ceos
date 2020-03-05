const server = require('./server')
const ext = require('./ext')
const job = require('./job')

module.exports = plop => {
  server(plop)
  ext(plop)
  job(plop)
}
