export default [
  {
    // Norway - Chrome - background
    input: './lib/norway/chrome/popup.js',
    output: [
      { name: 'sha', file: './dist-unpackaged/norway/chrome/popup.js', format: 'umd', exports: 'named' }
    ]
  },
  {
    // Norway - Chrome - background
    input: './lib/norway/chrome/background.js',
    output: [
      { name: 'sha', file: './dist-unpackaged/norway/chrome/background.js', format: 'umd', exports: 'named' }
    ]
  },
  {
    // Norway - Chrome - content - Ikea
    input: './lib/norway/chrome/cs.ikea.js',
    output: [
      { name: 'sha', file: './dist-unpackaged/norway/chrome/cs.ikea.no.js', format: 'umd', exports: 'named' }
    ]
  },
  {
    // Norway - Firefox - background
    input: './lib/norway/firefox/popup.js',
    output: [
      { name: 'sha', file: './dist-unpackaged/norway/firefox/popup.js', format: 'umd', exports: 'named' }
    ]
  },
  {
    // Norway - Firefox - background
    input: './lib/norway/firefox/background.js',
    output: [
      { name: 'sha', file: './dist-unpackaged/norway/firefox/background.js', format: 'umd', exports: 'named' }
    ]
  },
  {
    // Norway - Firefox - content - Ikea
    input: './lib/norway/firefox/cs.ikea.js',
    output: [
      { name: 'sha', file: './dist-unpackaged/norway/firefox/cs.ikea.no.js', format: 'umd', exports: 'named' }
    ]
  }
]
