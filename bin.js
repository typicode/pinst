const meow = require('meow')
const { enableAndSave, disableAndSave } = require('./index')

const cli = meow(
  `
  Usage
    $ pinst 

  Options
    --enable, -e   Enable postinstall hook
    --disable, -d  Disable postinstall hook

  Examples
    $ pinst --enable
`,
  {
    booleanDefault: undefined,
    flags: {
      enable: {
        type: 'boolean',
        alias: 'e'
      },
      disable: {
        type: 'boolean',
        alias: 'd'
      }
    }
  }
)

function run(cli) {
  if (cli.flags.enable) {
    console.log('pinst enable')
    return enableAndSave()
  }

  if (cli.flags.disable) {
    console.log('pinst disable')
    return disableAndSave()
  }

  // No known flag provided
  console.log(cli.showHelp())
  process.exit(1)
}

run(cli)
