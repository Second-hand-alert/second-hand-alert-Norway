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
      name: 'sha', file: './dist-unpackaged/chrome/cs.ikea.js', format: 'umd', exports: 'named'
    }
  },
  {
    // Chrome - content - AdLibris
    input: './lib/chrome/cs.adlibris.js',
    output: {
      name: 'sha', file: './dist-unpackaged/chrome/cs.adlibris.js', format: 'umd', exports: 'named'
    }
  },
  {
    // Chrome - content - Akademika
    input: './lib/chrome/cs.akademika.js',
    output: {
      name: 'sha', file: './dist-unpackaged/chrome/cs.akademika.js', format: 'umd', exports: 'named'
    }
  },
  {
    // Chrome - content - Ark
    input: './lib/chrome/cs.ark.js',
    output: {
      name: 'sha', file: './dist-unpackaged/chrome/cs.ark.js', format: 'umd', exports: 'named'
    }
  },
  {
    // Chrome - content - Bokkilden
    input: './lib/chrome/cs.bokkilden.js',
    output: {
      name: 'sha', file: './dist-unpackaged/chrome/cs.bokkilden.js', format: 'umd', exports: 'named'
    }
  },
  {
    // Chrome - content - Norli
    input: './lib/chrome/cs.norli.js',
    output: {
      name: 'sha', file: './dist-unpackaged/chrome/cs.norli.js', format: 'umd', exports: 'named'
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
      { name: 'sha', file: './dist-unpackaged/firefox/cs.ikea.js', format: 'umd', exports: 'named' }
    ]
  },
  {
    // Firefox - content - AdLibris
    input: './lib/firefox/cs.adlibris.js',
    output: [
      { name: 'sha', file: './dist-unpackaged/firefox/cs.adlibris.js', format: 'umd', exports: 'named' }
    ]
  },
  {
    // Firefox - content - Akademika
    input: './lib/firefox/cs.akademika.js',
    output: {
      name: 'sha', file: './dist-unpackaged/firefox/cs.akademika.js', format: 'umd', exports: 'named'
    }
  },
  {
    // Firefox - content - Ark
    input: './lib/firefox/cs.ark.js',
    output: [
      { name: 'sha', file: './dist-unpackaged/firefox/cs.ark.js', format: 'umd', exports: 'named' }
    ]
  },
  {
    // Firefox - content - Bokkilden
    input: './lib/firefox/cs.bokkilden.js',
    output: {
      name: 'sha', file: './dist-unpackaged/firefox/cs.bokkilden.js', format: 'umd', exports: 'named'
    }
  },
  {
    // Firefox - content - Norli
    input: './lib/firefox/cs.norli.js',
    output: [
      { name: 'sha', file: './dist-unpackaged/firefox/cs.norli.js', format: 'umd', exports: 'named' }
    ]
  }
]
