import eslint from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tseslintParser from "@typescript-eslint/parser";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

export default [
  eslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslintParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      "react-hooks": reactHooks,
    },
    rules: {
      ...tseslint.configs["recommended"].rules,
      ...reactHooks.configs.recommended.rules,
    },
  },
  {
    ignores: ["dist/**", ".eslintignore"],
  },
];
