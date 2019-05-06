module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'indent':0,
    // 'semi':0,
    // 'no-tabs':0,
    // 'keyword-spacing':0,
    // 'key-spacing':0,
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
