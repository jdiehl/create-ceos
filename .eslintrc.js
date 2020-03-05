module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true
      },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'standard'
  ],
  globals: {
    Atomics: readonly,
    SharedArrayBuffer: readonly
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    'arrow-parens': 0,
    'camelcase': 0,
    'curly': ['error', 'multi-line'],
    'no-console': ['warn'],
    'no-unreachable': ['warn'],
    'no-unused-vars': ['warn', { args: 'none' }],
    'padded-blocks': 0,
    'semi': [warn, never],
    'space-before-function-paren': ['error', 'never']
  }
}
