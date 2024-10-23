import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import pluginReact from "eslint-plugin-react";

export default [{
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser,
      parser: "@typescript-eslint/parser", // Specify the parser for TypeScript
    },
    rules: {
      // Add your custom rules here
      "prettier/prettier": "error", // Example rule to enforce Prettier
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    overrides: [{
      files: ["*.ts", "*.tsx"],
      rules: {
        // Add TypeScript-specific rules if necessary
        "@typescript-eslint/no-unused-vars": "warn", // Example rule
      },
      linterOptions: {
        reportUnusedDisableDirectives: true, // New option to report unused disable directives
      },
    }, ],
  },
];