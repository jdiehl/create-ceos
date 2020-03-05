const { promisify } = require('util')
const mkdir = promisify(require('fs').mkdir)

module.exports = plop => {

  plop.setActionType('mkdir', async (answers, { path }, plop) => {
    if (!path) throw new Error('Path missing')
    await mkdir(path)
    process.chdir(path)
  })

}
