const pkg = require('./pkg')
const mkdir = require('./mkdir')
const git = require('./git')

module.exports = plop => {
  pkg(plop)
  mkdir(plop)
  git(plop)
}
