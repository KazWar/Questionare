import commonjs from 'rollup-plugin-commonjs'
import vue from 'rollup-plugin-vue'
import html from 'rollup-plugin-html'
import scss from 'rollup-plugin-scss'
import copy from 'rollup-plugin-copy'
import json from 'rollup-plugin-json'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import image from '@rollup/plugin-image'

/**
 * HTTP port for running UI dev server
 */
const PORT = 8080

/**
 * Determine if building in WATCH mode
 */
const isWatching = Boolean(process.env.ROLLUP_WATCH)

/**
 * Build configuration
 */
const configuration = {
  /**
   * Build entry point
   */
  input: 'src/index.js',

  /**
   * Application runtime
   */
  output: {
    name: 'Fluid',
    file: 'dist/index.js',
    format: 'iife',
    sourcemap: true,
    globals: {
      vue: 'Vue',
      vuex: 'Vuex',
      axios: 'axios',
      uuidv4: 'uuidv4'
    }
  },

  /**
   * Watching
   */
  watch: {
    include: [
      './src/**'
    ]
  },

  /**
   * Plugins to use
   */
  plugins: [
    // Vue single-component files
    vue({
      template: {
        isProduction: false
      },
      needMap: false
    }),
    // Enable imports of CommonJS modules
    commonjs(),
    // Enable imports of HTML templates
    html(),
    // Enable imports of CSS and SCSS
    scss(),
    image(),
    // Enable importing of JSON files as JS modules
    json(),
    // Copy runtime files to /dev folder
    copy({
      targets: [
        { src: './package.json', dest: 'dist' },
        { src: './README.md', dest: 'dist' },
        { src: './src/index.html', dest: 'dist' }
      ]
    }),
    // Dev server if build in watch mode
    isWatching
      ? serve({
        host: 'localhost',
        port: PORT,
        contentBase: ['./dist', './node_modules'],
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
      : undefined,
    // Live reload if build in watch mode
    isWatching
      ? livereload({
        watch: ['./dev', './dist']
      })
      : undefined
  ],

  /**
   * External modules, do not bundle!
   */
  external: [
    'vue',
    'vuex',
    'axios',
    'quasar',
    'uuidv4'
  ]
}

module.exports = configuration
