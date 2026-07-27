import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import eslintParserTypeScript from "@typescript-eslint/parser";
import eslintPluginBetterTailwindcss from "eslint-plugin-better-tailwindcss";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    files: ["**/*.{ts,tsx,cts,mts}"],
    languageOptions: {
      parser: eslintParserTypeScript,
      parserOptions: {
        project: true,
      },
    },
  },
  {
    files: ["**/*.{jsx,tsx}"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "better-tailwindcss": eslintPluginBetterTailwindcss,
    },
    rules: {
      ...eslintPluginBetterTailwindcss.configs["recommended-warn"].rules,
      ...eslintPluginBetterTailwindcss.configs["recommended-error"].rules,

      // Formatting of class strings belongs to prettier-plugin-tailwindcss.
      // These three rules format too, and their output differs from
      // prettier's, so with both enabled a file never reaches a fixed point:
      // `eslint --fix` rewraps to multiline and reorders, prettier collapses
      // and reorders back, forever. ESLint keeps only the rules that catch
      // real defects (unknown, conflicting, duplicate, deprecated classes),
      // which prettier cannot detect.
      "better-tailwindcss/enforce-consistent-class-order": "off",
      "better-tailwindcss/enforce-consistent-line-wrapping": "off",
      "better-tailwindcss/no-unnecessary-whitespace": "off",
    },
    settings: {
      "better-tailwindcss": {
        // Tailwind v4: resolve the theme from the CSS entry point. There is no
        // tailwind.config.js in this project, so no v3 config is set.
        entryPoint: "src/app/globals.css",
      },
    },
  },
  {
    // Tests pass fixture classNames like "custom-class" to assert className
    // merging. They are deliberately not Tailwind utilities.
    files: ["**/__tests__/**/*.{ts,tsx}", "**/*.test.{ts,tsx}"],
    rules: {
      "better-tailwindcss/no-unknown-classes": "off",
    },
  },
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      ".claude/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
