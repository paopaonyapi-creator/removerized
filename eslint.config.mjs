import js from "@eslint/js"
import nextPlugin from "@next/eslint-plugin-next"
import reactHooks from "eslint-plugin-react-hooks"
import tseslint from "typescript-eslint"

export default [
  {
    ignores: [
      "**/.next/**",
      "**/node_modules/**",
      "**/dist/**",
      "**/coverage/**",
      "**/removerized/**",
      "**/tailwind.config.cjs",
      "**/postcss.config.js",
      "**/postcss.config.mjs",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,jsx,mjs,ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2022,
        sourceType: "module",
      },
      globals: {
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        File: "readonly",
        Blob: "readonly",
        HTMLImageElement: "readonly",
      },
    },
    plugins: {
      "@next/next": nextPlugin,
      "react-hooks": reactHooks,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      ...reactHooks.configs.recommended.rules,
      "@next/next/no-html-link-for-pages": "off",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
  {
    files: ["**/*.cjs"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "commonjs",
    },
  },
]
