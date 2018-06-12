module.exports = {
  extends: ['plugin:node/recommended', 'xo-space/esnext', 'prettier'],
  plugins: ['node', 'prettier'],
  rules: {
    'no-process-exit': 'off',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false
      }
    ]
  },
  env: {
    jest: true
  }
}
