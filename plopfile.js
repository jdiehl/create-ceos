const generators = require('./generators')
const commands = require('./commands')

module.exports = plop => {
  generators(plop)
  commands(plop)
}
