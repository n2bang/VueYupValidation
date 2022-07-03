const path = require('path')
const { defineConfig } = require('vite')
const vue = require('@vitejs/plugin-vue');

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/components/index.js'),
      name: 'vue-yup-validation',
      fileName: (format) => `vue-yup-validation.${format}.js`
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  plugins: [vue()],
})