import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["@giphy/react-components/dist/styles.css"],
    base: "/vite-deploy/",
  },
});
