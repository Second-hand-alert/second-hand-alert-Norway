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
  }
]
