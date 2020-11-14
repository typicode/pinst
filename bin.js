#!/usr/bin/env node
const meow = require('meow')
const { enableAndSave, disableAndSave } = require('./index')

const cli = meow(
  `
  Usage
    $ pinst 

  Options
    --enable, -e   Enable postinstall hook
    --disable, -d  Disable postinstall hook
    --silent, -s

  Examples
    $ pinst --enable
`,
  {
    flags: {
      enable: {
        type: 'boolean',
        alias: 'e',
      },
      disable: {
        type: 'boolean',
        alias: 'd',
      },
      silent: {
        type: 'boolean',
        alias: 's',
      },
    },
  }
)

function run(cli) {
  if (cli.flags.enable) {
    if (!cli.flags.silent) console.log('pinst enable')
    return enableAndSave()
  }

  if (cli.flags.disable) {
    if (!cli.flags.silent) console.log('pinst disable')
    return disableAndSave()
  }

  // No known flag provided
  console.log(cli.showHelp())
  process.exit(1)
}

run(cli)
