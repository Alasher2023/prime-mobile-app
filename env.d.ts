/// <reference types="vite/client" />
interface ImportMetaEnv {
  VITE_API_URL: string;
  VITE_APP_TITLE: string;
  VITE_APP_DESCRIPTION: string;
  VITE_APP_AUTHOR: string;
  VITE_APP_COPYRIGHT: string;
  VITE_APP_LICENSE: string;
  VITE_APP_VERSION: string;
  VITE_APP_BUILD_TIME: string;
}

interface ImportMeta {
  env: ImportMetaEnv;
}
