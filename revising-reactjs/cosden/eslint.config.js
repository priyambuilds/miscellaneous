import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort";

export default [
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "@typescript-eslint": tsPlugin,
      "simple-import-sort": simpleImportSortPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // Import sorting
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^@?\\w"],
            ["^@/"],
            ["^\\.\\./", "^\\./"],
            ["^\\u0000"],
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            ["^.+\\.?(css)$"],
          ],
        },
      ],

      // TypeScript rules
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],

      // React rules
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      // Spread recommended react-hooks rules
      ...reactHooksPlugin.configs['recommended-latest'].rules,
      
      // Enable React Compiler rule
      "react-hooks/react-compiler": "error",
    },
  },
];
