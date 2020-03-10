const { readdirSync } = require('fs')
const { join, extname } = require('path')

function templateAction(path, filename, data = {}, newName) {
  return {
    type: 'add',
    path: join(process.cwd(), path, newName || filename),
    templateFile: join(__dirname, 'templates', `${filename}.hbs`),
    skipIfExists: true,
    data
  }
}

module.exports = plop => {
  plop.setGenerator('migration', {
    description: 'Create a migration',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Migration name',
        validate: name => name.length > 0
      }],
    actions: ({ name }) => {
      const files = readdirSync('migrations').filter(file => extname(file) === '.js').sort()
      const id = (parseInt(files.lastItem, 10) || 0) + 1
      const prefix = (id < 10 ? '0' : '') + id
      return [
        templateAction('migrations', 'index.js', {}, `${prefix}-${name}.js`)
      ]
    }
  })

}
