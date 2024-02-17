import react from "@vitejs/plugin-react";
import { defineConfig } from 'vite';

export default ({ command }) => {
  const isProduction = command === 'build';

  return defineConfig({
    plugins: [react()],
    server: {
      proxy: isProduction ? {} : {
        '/login': {
          target: 'http://localhost:3000',
          changeOrigin: true,
        },
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
        },
        '/rowfiles': {
          target: 'http://localhost:3000',
          changeOrigin: true,
        },
      },
    },
  });
};
