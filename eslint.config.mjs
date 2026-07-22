import eslint from "@eslint/js";
import prettier from "eslint-config-prettier";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["cdk.out/", "coverage/", "node_modules/"],
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ["test/**/*.test.ts"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
  },
  prettier,
);
