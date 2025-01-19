// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';
import stylistic from '@stylistic/eslint-plugin'

export default tseslint.config({
  files: ["**/*.ts"],
  plugins: {
    '@stylistic': stylistic
  },
  extends: [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    ...tseslint.configs.stylistic,
    ...angular.configs.tsRecommended,
  ],
  processor: angular.processInlineTemplates,
  rules: {
    "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
    "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
    "@stylistic/semi": ["warn"],
    "@typescript-eslint/no-for-in-array": "error"
  },
});