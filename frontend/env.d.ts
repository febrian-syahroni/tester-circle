/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_API_URL: string; // Tambahkan variabel lain sesuai kebutuhan
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
