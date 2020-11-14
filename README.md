# pinst ![Node.js CI](https://github.com/typicode/pinst/workflows/Node.js%20CI/badge.svg) [![npm](https://img.shields.io/npm/v/pinst.svg)](https://www.npmjs.com/package/pinst)

> `pinst` lets you have `postinstall` hook that runs only in dev 🍺

This can be useful if you want to automatically run commands just after `npm install`, but don't want your package users to be affected. 

Alternatively, you can also use it the other way around and prevent `postinstall` hook to run in dev (that's how I'm using it for [husky](https://github.com/typicode/husky)).

## Usage

```sh
$ npm install pinst --save-dev
```

```js
// package.json
{
  "scripts": {
    "postinstall": "...",
    // Add pinst to npm publish hooks
    "prepublishOnly": "pinst --disable",
    "postpublish": "pinst --enable"
  }
}
```

```sh
$ npm publish
```

_On `prepublishOnly`, `postinstall` will be renamed to `_postinstall` (disabled)_

_On `postpublish`, it will be renamed back to `postinstall` (enabled)_

## CLI

`pinst` accepts the following flags

```
--enable, -e   Enable postinstall hook
--disable, -d  Disable postinstall hook
--silent, -s
```

## Try it

You can test that everything works, without actually publishing your package, by manually running the following commands

```sh
npm run prepublishOnly # Check package.json
npm run postpublish    # Check package.json
```

## Tips

By inverting commands, you can also use `pinst` to enable `postinstall` for your users only and not yourself.

`pinst` also supports `install` alias.

## License

MIT - [Typicode :cactus:](https://github.com/typicode)
