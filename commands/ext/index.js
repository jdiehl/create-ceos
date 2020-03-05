const { join } = require('path')
const camelCase = require('camelcase')

function templateAction(path, filename, data = {}, newName) {
  return {
    type: 'add',
    path: join(process.cwd(), path, newName ? newName : filename),
    templateFile: join(__dirname, 'templates', `${filename}.hbs`),
    skipIfExists: true,
    data
  }
}

module.exports = plop => {
  plop.setHelper('camelCase', camelCase)
  plop.setGenerator('ext', {
    description: 'Create a ceos extension',
    prompts: [
      {
      type: 'input',
      name: 'name',
      message: 'Extension name',
      validate: name => name.length > 0
    }, {
      type: 'input',
      name: 'model',
      message: 'Model name',
      validate: name => name.length > 0
    }],
    actions: ({ name, model }) => {
      const path = join('extensions', name)
      return [
        templateAction(path, 'index.js', { model }),
        templateAction(path, 'Model.js', { model }, `${model}.js`),
        templateAction(path, 'mutations.js', { model }),
        templateAction(path, 'queries.js', { model }),
        templateAction(path, 'resolvers.js', { model }),
        templateAction(path, 'typeDefs.js', { model }),
        { type: 'modify', path: join('extensions', 'index.js'), pattern: ']', template: `  require('./${name}'),\n]`}
      ]
    }
  })

}
