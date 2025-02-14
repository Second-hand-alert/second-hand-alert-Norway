import { nodeResolve } from '@rollup/plugin-node-resolve'

export default [
  {
    // Norway - Chrome - popup
    input: './lib/norway/chrome/popup.js',
    output: {
      name: 'sha', file: './dist-unpackaged/norway/chrome/popup.js', format: 'umd', exports: 'named'
    },
    plugins: [nodeResolve()]
  },
  {
    // Norway - Chrome - background
    input: './lib/norway/chrome/background.js',
    output: {
      name: 'sha', file: './dist-unpackaged/norway/chrome/background.js', format: 'umd', exports: 'named'
    }
  },
  {
    // Norway - Chrome - content - Ikea
    input: './lib/norway/chrome/cs.ikea.js',
    output: {
      name: 'sha', file: './dist-unpackaged/norway/chrome/cs.ikea.no.js', format: 'umd', exports: 'named'
    }
  },
  {
    // Norway - Chrome - content - Ark
    input: './lib/norway/chrome/cs.ark.no.js',
    output: {
      name: 'sha', file: './dist-unpackaged/norway/chrome/cs.ark.no.js', format: 'umd', exports: 'named'
    }
  },
  {
    // Norway - Chrome - content - Norli
    input: './lib/norway/chrome/cs.norli.no.js',
    output: {
      name: 'sha', file: './dist-unpackaged/norway/chrome/cs.norli.no.js', format: 'umd', exports: 'named'
    }
  },
  {
    // Norway - Firefox - popup
    input: './lib/norway/firefox/popup.js',
    output: {
      name: 'sha', file: './dist-unpackaged/norway/firefox/popup.js', format: 'umd', exports: 'named'
    },
    plugins: [nodeResolve()]
  },
  {
    // Norway - Firefox - background
    input: './lib/norway/firefox/background.js',
    output: {
      name: 'sha', file: './dist-unpackaged/norway/firefox/background.js', format: 'umd', exports: 'named'
    }
  },
  {
    // Norway - Firefox - content - Ikea
    input: './lib/norway/firefox/cs.ikea.js',
    output: [
      { name: 'sha', file: './dist-unpackaged/norway/firefox/cs.ikea.no.js', format: 'umd', exports: 'named' }
    ]
  },
  {
    // Norway - Firefox - content - Ark
    input: './lib/norway/firefox/cs.ark.no.js',
    output: [
      { name: 'sha', file: './dist-unpackaged/norway/firefox/cs.ark.no.js', format: 'umd', exports: 'named' }
    ]
  },
  {
    // Norway - Firefox - content - Norli
    input: './lib/norway/firefox/cs.norli.no.js',
    output: [
      { name: 'sha', file: './dist-unpackaged/norway/firefox/cs.norli.no.js', format: 'umd', exports: 'named' }
    ]
  }
]
