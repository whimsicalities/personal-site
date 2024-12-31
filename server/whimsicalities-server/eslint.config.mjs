// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin'

export default tseslint.config({
  files: ["**/*.ts"],
  plugins: {
    '@stylistic': stylistic
  },
  extends: [
    eslint.configs.recommended,
    tseslint.configs.recommended,
  ],
  rules: {
    "@typescript-eslint/no-explicit-any": 'off',
    "@stylistic/semi": ["warn"],
  }
});