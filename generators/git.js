const { promisify } = require('util')
const exec = promisify(require('child_process').exec)

module.exports = plop => {

  plop.setActionType('git init', async (answers, config, plop) => {
    await exec(`git init`)
  })

  plop.setActionType('git add all', async (answers, config, plop) => {
    await exec(`git add -A`)
  })

  plop.setActionType('git commit', async (answers, { message }, plop) => {
    await exec(`git commit -m "${message}"`)
  })

}
