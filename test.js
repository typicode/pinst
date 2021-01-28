const fs = require('fs')
const path = require('path')
const tempy = require('tempy')
const { enableAndSave, disableAndSave } = require('./index')

function createPkg(str) {
  const dir = tempy.directory()
  const file = path.join(dir, 'package.json')
  fs.writeFileSync(file, str, 'utf-8')
  return { dir, file }
}

const enabledStr = `{
  "scripts": {
    "start": "s",
    "test": "t",
    "install": "i",
    "postinstall": "p"
  }
}`

const disabledStr = `{
  "scripts": {
    "start": "s",
    "test": "t",
    "_install": "i",
    "_postinstall": "p"
  }
}`

// Different indent and order (must be preserved)
const enabledStr2 = `{
    "scripts": {
        "postinstall": "p",
        "start": "s",
        "test": "t",
        "install": "i"
    }
}`

const disabledStr2 = `{
    "scripts": {
        "_postinstall": "p",
        "start": "s",
        "test": "t",
        "_install": "i"
    }
}`

test('enable and write back', () => {
  const { dir, file } = createPkg(disabledStr)
  enableAndSave(dir)
  expect(fs.readFileSync(file, 'utf-8')).toEqual(enabledStr)
})

test('disable and write back', () => {
  const { dir, file } = createPkg(enabledStr2)
  disableAndSave(dir)
  expect(fs.readFileSync(file, 'utf-8')).toEqual(disabledStr2)
})
