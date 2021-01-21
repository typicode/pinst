#!/usr/bin/env node
const pkg = require('./package.json')
const { enableAndSave, disableAndSave } = require('./index')

const usage = `Usage
  $ pinst

Options
  --enable, -e   Enable postinstall hook
  --disable, -d  Disable postinstall hook
  --silent, -s

Examples
  $ pinst --enable`

function run(args) {
  // Silent
  const silent = args.includes('--silent') || args.includes('-s')

  // Enable
  if (args.includes('--enable') || args.includes('-e')) {
    if (!silent) console.log('pinst enable')
    return enableAndSave()
  }

  // Disable
  if (args.includes('--disable') || args.includes('-d')) {
    if (!silent) console.log('pinst disable')
    return disableAndSave()
  }

  // Version
  if (args.includes('--version') || args.includes('-v')) {
    return console.log(pkg.version)
  }

  // No known flag provided
  console.log(usage)
  process.exit(1)
}

const [, , ...args] = process.argv
run(args)
