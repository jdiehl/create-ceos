const { join } = require('path')
const { randomBytes } = require('crypto')

function templateAction(path, filename, data = {}) {
  return {
    type: 'add',
    path: join(process.cwd(), path, filename),
    templateFile: join(__dirname, 'templates', `${filename}.hbs`),
    skipIfExists: true,
    data
  }
}

function randomHash() {
  return randomBytes(16).toString('hex')
}

module.exports = plop => {

  plop.setGenerator('server', {
    description: 'Initialize a new ceos server project',
    prompts: [{
			type: 'input',
			name: 'name',
			message: 'Project name',
      validate: name => name.length > 0
    }],
    actions: ({ name }) => {
      const path = `${name}-server`
      return [
        { type: 'mkdir', path },
        { type: `pkg init`, options: {
          name: path,
          private: true,
          scripts: {
            test: 'eslint .',
            dev: 'nodemon --inspect index.js',
            start: 'node index.js'
          }
        } },
        templateAction(path, '.editorconfig'),
        templateAction(path, '.env', { name, admin_token: randomHash(), jwt_secret: randomHash() }),
        templateAction(path, '.eslintrc.js'),
        templateAction(path, '.gitignore'),
        templateAction(path, '.gitlab-ci.yml'),
        templateAction(path, 'Dockerfile', { name }),
        templateAction(path, 'README.md', { name }),
        templateAction(path, 'index.js'),
        templateAction(path, join('jobs', 'index.js')),
        templateAction(path, join('extensions', 'index.js')),
        { type: `pkg install`, packages: ['ceos'] },
        { type: `pkg install-dev`, packages: [
          'eslint',
          'eslint-config-standard',
          'eslint-plugin-import',
          'eslint-plugin-node',
          'eslint-plugin-promise',
          'eslint-plugin-standard',
          'nodemon',
          'dotenv'
        ] },
        { type: 'git init' },
        { type: 'git add all' },
        { type: 'git commit', message: 'Initial import' }
      ]
    }
  })

}
