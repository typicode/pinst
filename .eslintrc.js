module.exports = {
  extends: ['plugin:node/recommended', 'xo-space/esnext', 'prettier'],
  plugins: ['node', 'prettier'],
  rules: {
    'no-process-exit': 'off',
  },
  env: {
    jest: true,
  },
}
