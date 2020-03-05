const { promisify } = require('util')
const { basename } = require('path')
const writeFile = promisify(require('fs').writeFile)
const exec = promisify(require('child_process').exec)

module.exports = plop => {

  plop.setActionType('pkg init', async (answers, { options }, plop) => {
    const info = Object.assign({
      name: basename(plop.getDestBasePath()),
      description: 'My ceos project',
      version: '1.0.0',
      main: 'index.js',
      license: 'ISC'
    }, options)
    await writeFile('./package.json', JSON.stringify(info, null, '  '))
  })

  plop.setActionType('pkg install', async (answers, { packages }, plop) => {
    if (packages instanceof Array) packages = packages.join(' ')
    await exec(`yarn add ${packages}`)
  })

  plop.setActionType('pkg install-dev', async (answers, { packages }, plop) => {
    if (packages instanceof Array) packages = packages.join(' ')
    await exec(`yarn add -D ${packages}`)
  })

}
