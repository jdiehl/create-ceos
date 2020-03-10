const { join } = require('path')

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
  plop.setGenerator('job', {
    description: 'Create a ceos job',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Job name',
        validate: name => name.length > 0
      }],
    actions: ({ name }) => {
      const path = join('jobs', name)
      return [
        templateAction(path, 'index.js', { name }),
        { type: 'modify', path: join('jobs', 'index.js'), pattern: ']', template: `  require('./${name}'),\n]` }
      ]
    }
  })

}
