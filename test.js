const loadJsonFile = require('load-json-file')
const writeJsonFile = require('write-json-file')
const {
  enableScript,
  enableAndSave,
  disableScript,
  disableAndSave
} = require('./index')

const enabledPkg = {
  scripts: {
    start: '',
    postinstall: 'postinstall'
  }
}

const disabledPkg = {
  scripts: {
    start: '',
    _postinstall: 'postinstall'
  }
}

const pkgFile = 'package.json'

test('enableScript', () => {
  expect(enableScript(disabledPkg, 'postinstall')).toEqual(enabledPkg)
})

test('enableAndSave', () => {
  loadJsonFile.sync = jest.fn(() => disabledPkg)
  writeJsonFile.sync = jest.fn()

  enableAndSave(pkgFile)
  expect(loadJsonFile.sync).toHaveBeenCalledWith(pkgFile)
  expect(writeJsonFile.sync).toHaveBeenCalledWith(pkgFile, enabledPkg, {
    indent: 2
  })
})

test('disableScript', () => {
  expect(disableScript(enabledPkg, 'postinstall')).toEqual(disabledPkg)
})

test('disableAndSave', () => {
  loadJsonFile.sync = jest.fn(() => enabledPkg)
  writeJsonFile.sync = jest.fn()

  disableAndSave(pkgFile)
  expect(loadJsonFile.sync).toHaveBeenCalledWith(pkgFile)
  expect(writeJsonFile.sync).toHaveBeenCalledWith(pkgFile, disabledPkg, {
    indent: 2
  })
})
