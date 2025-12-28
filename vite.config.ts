
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import process from 'node:process';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all envs regardless of the `VITE_` prefix.
  // Fix: Explicitly using process from node:process to resolve the 'cwd' property error
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // Mapping various possible env names to process.env.API_KEY for the app
      'process.env.API_KEY': JSON.stringify(env.API_KEY || env.VITE_API_KEY || env.VITE_GEMINI_API_KEY),
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
    server: {
      port: 3000,
    },
    build: {
      outDir: 'dist',
    }
  };
});
