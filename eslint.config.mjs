import { defineConfig } from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // Custom overrides and rules
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
    rules: {
      // 🚫 Prevent stray semicolons that cause visual artifacts in Next.js pages
      "no-extra-semi": "error",
      // 🧼 Optional: helps avoid invisible parsing issues
      "no-unexpected-multiline": "error",
      "semi": ["error", "never"]
    },
  },
])

export default eslintConfig
