import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier/recommended';

export default [
  js.configs.recommended,
  prettier, // This integrates Prettier and must be last
  {
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
    },
  },
];