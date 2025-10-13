import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: "src",             // default: "."
  modules: ['@wxt-dev/module-react'],
  manifest: {
    return {
    name: 'My Extension',
    version: '1.0.0',
    description: 'A description of my extension',
    permissions: ['storage', 'tabs'],
  }
  }

});
