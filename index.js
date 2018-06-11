const loadJsonFile = require('load-json-file')
const writeJsonFile = require('write-json-file')
const mapKeys = require('lodash.mapkeys')

const PKG_FILE = 'package.json'

// Rename key in object without changing its position
function renameKey(obj, prevKey, nextKey) {
  return mapKeys(obj, (_, key) => (key === prevKey ? nextKey : key))
}

// Prefix script name with _ to disable it
function disable(name) {
  return `_${name}`
}

function renameScript(pkg, prevName, nextName) {
  const newPkg = Object.assign({}, pkg)
  newPkg.scripts = renameKey(pkg.scripts, prevName, nextName)
  return newPkg
}

function enableScript(pkg, name) {
  return renameScript(pkg, disable(name), name)
}

function disableScript(pkg, name) {
  return renameScript(pkg, name, disable(name))
}

function enableAndSave() {
  const pkg = loadJsonFile.sync(PKG_FILE)
  const newPkg = enableScript(enableScript(pkg, 'postinstall'), 'install')
  writeJsonFile.sync(PKG_FILE, newPkg, { indent: 2 })
}

function disableAndSave() {
  const pkg = loadJsonFile.sync(PKG_FILE)
  const newPkg = disableScript(disableScript(pkg, 'postinstall'), 'install')
  writeJsonFile.sync(PKG_FILE, newPkg, { indent: 2 })
}

module.exports = {
  enableScript,
  disableScript,
  enableAndSave,
  disableAndSave
}
