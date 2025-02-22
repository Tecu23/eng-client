import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            "@/hooks": path.resolve(__dirname, "src/utilities/hooks/"),
            "@/images": path.resolve(__dirname, "src/assets/"),
            "@/context": path.resolve(__dirname, "src/utilities/context/"),
            "@/constants": path.resolve(__dirname, "src/utilities/constants/"),
            "@/components": path.resolve(__dirname, "src/components/"),
        },
    },
    plugins: [tailwindcss(), react()],
});
