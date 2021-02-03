const fs = require('fs')
const path = require('path')
const writeJsonFile = require('write-json-file')
const fromEntries = require('fromentries')

// Read package.json
function readPkg(dir) {
  const file = path.join(dir, 'package.json')
  return JSON.parse(fs.readFileSync(file, 'utf-8'))
}

// Write package.json
function writePkg(dir, str) {
  const file = path.join(dir, 'package.json')
  writeJsonFile.sync(file, str, { detectIndent: true })
}

// Update package.json
function updatePkg(dir, fn) {
  const prev = readPkg(dir)
  const next = fn(prev)
  writePkg(dir, next)
}

// Update pkg.scripts names
function updateScripts(pkg, fn) {
  const nextPkg = { ...pkg }
  nextPkg.scripts = fromEntries(
    Object.entries(nextPkg.scripts).map(([key, value]) => [fn(key), value]),
  )
  return nextPkg
}

function enable(name) {
  if (['_preinstall', '_install', '_postinstall'].includes(name)) {
    return name.substring(1)
  }

  return name
}

function disable(name) {
  if (['preinstall', 'install', 'postinstall'].includes(name)) {
    return `_${name}`
  }

  return name
}

function enableAndSave(dir = process.cwd()) {
  updatePkg(dir, (pkg) => updateScripts(pkg, enable))
}

function disableAndSave(dir = process.cwd()) {
  updatePkg(dir, (pkg) => updateScripts(pkg, disable))
}

module.exports = {
  enableAndSave,
  disableAndSave,
}
