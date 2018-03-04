// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/essential',
    'standard'
  ],
  plugins: [
    'vue'
  ],
  rules: {
    'no-new': 0,
    'generator-star-spacing': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': 0,
    'no-unused-vars': 'warn',
    'no-console': 0,
    'eqeqeq': 2,
    'no-else-return': 1,
    'no-empty-function': 1,
    'no-unexpected-multiline': 'warn',
    'dot-location': 1,
    'guard-for-in': 0,
    'no-invalid-this': 0,
    'max-len': [
      'warn',
      140
    ]
  }
}
