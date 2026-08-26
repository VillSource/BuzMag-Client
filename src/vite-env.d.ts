/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL of the BuzMag API, defaults to https://localhost:7030 */
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
