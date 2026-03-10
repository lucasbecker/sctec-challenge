import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

function getBase() {
  if (process.env.GITHUB_ACTIONS) {
    const repo = process.env.GITHUB_REPOSITORY?.split("/").at(1)

    return repo ? `/${repo}/` : "/"
  }

  return "/"
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: getBase(),
})
