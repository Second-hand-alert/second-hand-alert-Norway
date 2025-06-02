import { nodeResolve } from '@rollup/plugin-node-resolve'

export default [
  {
    // Chrome - popup
    input: './lib/chrome/popup.js',
    output: {
      name: 'sha', file: './dist-unpackaged/chrome/popup.js', format: 'umd', exports: 'named'
    },
    plugins: [nodeResolve()]
  },
  {
    // Chrome - background
    input: './lib/chrome/background.js',
    output: {
      name: 'sha', file: './dist-unpackaged/chrome/background.js', format: 'umd', exports: 'named'
    }
  },
  {
    // Chrome - content - Ikea
    input: './lib/chrome/cs.ikea.js',
    output: {
      name: 'sha', file: './dist-unpackaged/chrome/cs.ikea.no.js', format: 'umd', exports: 'named'
    }
  },
  {
    // Chrome - content - Ark
    input: './lib/chrome/cs.ark.no.js',
    output: {
      name: 'sha', file: './dist-unpackaged/chrome/cs.ark.no.js', format: 'umd', exports: 'named'
    }
  },
  {
    // Chrome - content - Norli
    input: './lib/chrome/cs.norli.no.js',
    output: {
      name: 'sha', file: './dist-unpackaged/chrome/cs.norli.no.js', format: 'umd', exports: 'named'
    }
  },
  {
    // Firefox - popup
    input: './lib/firefox/popup.js',
    output: {
      name: 'sha', file: './dist-unpackaged/firefox/popup.js', format: 'umd', exports: 'named'
    },
    plugins: [nodeResolve()]
  },
  {
    // Firefox - background
    input: './lib/firefox/background.js',
    output: {
      name: 'sha', file: './dist-unpackaged/firefox/background.js', format: 'umd', exports: 'named'
    }
  },
  {
    // Firefox - content - Ikea
    input: './lib/firefox/cs.ikea.js',
    output: [
      { name: 'sha', file: './dist-unpackaged/firefox/cs.ikea.no.js', format: 'umd', exports: 'named' }
    ]
  },
  {
    // Firefox - content - Ark
    input: './lib/firefox/cs.ark.no.js',
    output: [
      { name: 'sha', file: './dist-unpackaged/firefox/cs.ark.no.js', format: 'umd', exports: 'named' }
    ]
  },
  {
    // Firefox - content - Norli
    input: './lib/firefox/cs.norli.no.js',
    output: [
      { name: 'sha', file: './dist-unpackaged/firefox/cs.norli.no.js', format: 'umd', exports: 'named' }
    ]
  }
]
