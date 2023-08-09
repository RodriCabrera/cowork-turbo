module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:tailwindcss/recommended',
    'standard',
    'next'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    'react/react-in-jsx-scope': 'off',
    'space-before-function-paren': 'off',
    'dot-notation': 'off',
    'no-undef': 'off',
    'multiline-ternary': 'off',
    'no-console': 'warn',
    'no-unused-vars': 'warn',
    camelcase: 'off'
  },
  ignorePatterns: ['**/node_modules/**', '**/.next/**', '**/build/**']
}
