#!/usr/bin/env node
const { join } = require('path')
const nodePlop = require('node-plop')
const ora = require('ora')
const [cmd, name] = process.argv.slice(2)

const plop = nodePlop(join(__dirname, 'plopfile.js'), { destBasePath: process.cwd() })

const generators = plop.getGeneratorList().map(g => g.name)

if (!cmd || !generators.includes(cmd)) {
  console.info(`  Usage: ceos-cli [${generators.join('|')}]`)
  process.exit(2)
}

function progressLog(item) {
  let line = ''
  if (item.type) { line += ` ${item.type}` }
  if (item.path) { line += ` ${item.path}` }
  const errMsg = item.error || item.message
  if (errMsg) { line += ` ${errMsg}` }
  return line
}

async function run() {
  const gen = plop.getGenerator(cmd)
  const answers = await gen.runPrompts(name ? [name] : undefined)
  const progress = ora()
  const onComment = (msg) => progress.info(msg).start
  const onSuccess = (change) => progress.succeed(progressLog(change)).start()
  const onFailure = (fail) => progress.fail(progressLog(fail)).start()
  progress.start()
  await gen.runActions(answers, { onSuccess, onFailure, onComment })
  progress.stop()
}

run().catch(err => {
  console.error(err)
  process.exit(1)
})
