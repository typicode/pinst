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
    postinstall: 'postinstall',
    install: 'install' //  Alias for postinstall
  }
}

const disabledPkg = {
  scripts: {
    start: '',
    _postinstall: 'postinstall',
    _install: 'install' // Alias for postinstall
  }
}

const pkgFile = 'package.json'

test('enableScript', () => {
  expect(
    enableScript(enableScript(disabledPkg, 'postinstall'), 'install')
  ).toEqual(enabledPkg)
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
  expect(
    disableScript(disableScript(enabledPkg, 'postinstall'), 'install')
  ).toEqual(disabledPkg)
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
