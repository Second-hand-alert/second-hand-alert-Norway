import { nodeResolve } from '@rollup/plugin-node-resolve'

export default [
  {
    // ######### Chrome - popup #########
    input: './lib/chrome/popup.js',
    output: {
      name: 'sha', file: './dist-unpackaged/chrome/popup.js', format: 'umd', exports: 'named'
    },
    plugins: [nodeResolve()]
  },
  {
    // ######### Chrome - background #########
    input: './lib/chrome/background.js',
    output: {
      name: 'sha', file: './dist-unpackaged/chrome/background.js', format: 'umd', exports: 'named'
    }
  },
  // ######### Chrome furniture stores #########
  {
    input: './lib/chrome/cs.ikea.js',
    output: {
      name: 'sha', file: './dist-unpackaged/chrome/cs.ikea.js', format: 'umd', exports: 'named'
    }
  },
  // ######### Chrome book stores #########
  {
    input: './lib/chrome/cs.abebooks.js',
    output: {
      name: 'sha', file: './dist-unpackaged/chrome/cs.abebooks.js', format: 'umd', exports: 'named'
    }
  },
  {
    input: './lib/chrome/cs.adlibris.js',
    output: {
      name: 'sha', file: './dist-unpackaged/chrome/cs.adlibris.js', format: 'umd', exports: 'named'
    }
  },
  {
    input: './lib/chrome/cs.akademika.js',
    output: {
      name: 'sha', file: './dist-unpackaged/chrome/cs.akademika.js', format: 'umd', exports: 'named'
    }
  },
  {
    input: './lib/chrome/cs.amazoncom.js',
    output: {
      name: 'sha', file: './dist-unpackaged/chrome/cs.amazoncom.js', format: 'umd', exports: 'named'
    }
  },
  {
    input: './lib/chrome/cs.amazoncouk.js',
    output: {
      name: 'sha', file: './dist-unpackaged/chrome/cs.amazoncouk.js', format: 'umd', exports: 'named'
    }
  },
  {
    input: './lib/chrome/cs.ark.js',
    output: {
      name: 'sha', file: './dist-unpackaged/chrome/cs.ark.js', format: 'umd', exports: 'named'
    }
  },
  {
    input: './lib/chrome/cs.bokkilden.js',
    output: {
      name: 'sha', file: './dist-unpackaged/chrome/cs.bokkilden.js', format: 'umd', exports: 'named'
    }
  },
  {
    input: './lib/chrome/cs.norli.js',
    output: {
      name: 'sha', file: './dist-unpackaged/chrome/cs.norli.js', format: 'umd', exports: 'named'
    }
  },
  {
    input: './lib/chrome/cs.tronsmo.js',
    output: {
      name: 'sha', file: './dist-unpackaged/chrome/cs.tronsmo.js', format: 'umd', exports: 'named'
    }
  },
  // ######### Chrome clothe stores #########
  {
    input: './lib/chrome/cs.barnashus.js',
    output: {
      name: 'sha', file: './dist-unpackaged/chrome/cs.barnashus.js', format: 'umd', exports: 'named'
    }
  },
  {
    input: './lib/chrome/cs.didriksons.js',
    output: {
      name: 'sha', file: './dist-unpackaged/chrome/cs.didriksons.js', format: 'umd', exports: 'named'
    }
  },
  {
    input: './lib/chrome/cs.gullkorn.js',
    output: {
      name: 'sha', file: './dist-unpackaged/chrome/cs.gullkorn.js', format: 'umd', exports: 'named'
    }
  },
  {
    input: './lib/chrome/cs.kappahl.js',
    output: {
      name: 'sha', file: './dist-unpackaged/chrome/cs.kappahl.js', format: 'umd', exports: 'named'
    }
  },
  {
    input: './lib/chrome/cs.kattnakken.js',
    output: {
      name: 'sha', file: './dist-unpackaged/chrome/cs.kattnakken.js', format: 'umd', exports: 'named'
    }
  },
  {
    input: './lib/chrome/cs.polarnopyret.js',
    output: {
      name: 'sha', file: './dist-unpackaged/chrome/cs.polarnopyret.js', format: 'umd', exports: 'named'
    }
  },
  {
    input: './lib/chrome/cs.reima.js',
    output: {
      name: 'sha', file: './dist-unpackaged/chrome/cs.reima.js', format: 'umd', exports: 'named'
    }
  },
  {
    // ######### Firefox - popup #########
    input: './lib/firefox/popup.js',
    output: {
      name: 'sha', file: './dist-unpackaged/firefox/popup.js', format: 'umd', exports: 'named'
    },
    plugins: [nodeResolve()]
  },
  {
    // ######### Firefox - background #########
    input: './lib/firefox/background.js',
    output: {
      name: 'sha', file: './dist-unpackaged/firefox/background.js', format: 'umd', exports: 'named'
    }
  },
  // ######### Firefox furniture stores #########
  {
    input: './lib/firefox/cs.ikea.js',
    output: [
      { name: 'sha', file: './dist-unpackaged/firefox/cs.ikea.js', format: 'umd', exports: 'named' }
    ]
  },
  // ######### Firefox books stores #########
  {
    input: './lib/firefox/cs.abebooks.js',
    output: [
      { name: 'sha', file: './dist-unpackaged/firefox/cs.abebooks.js', format: 'umd', exports: 'named' }
    ]
  },
  {
    input: './lib/firefox/cs.adlibris.js',
    output: [
      { name: 'sha', file: './dist-unpackaged/firefox/cs.adlibris.js', format: 'umd', exports: 'named' }
    ]
  },
  {
    input: './lib/firefox/cs.akademika.js',
    output: {
      name: 'sha', file: './dist-unpackaged/firefox/cs.akademika.js', format: 'umd', exports: 'named'
    }
  },
  {
    input: './lib/firefox/cs.amazoncom.js',
    output: [
      { name: 'sha', file: './dist-unpackaged/firefox/cs.amazoncom.js', format: 'umd', exports: 'named' }
    ]
  },
  {
    input: './lib/firefox/cs.amazoncouk.js',
    output: [
      { name: 'sha', file: './dist-unpackaged/firefox/cs.amazoncouk.js', format: 'umd', exports: 'named' }
    ]
  },
  {
    input: './lib/firefox/cs.ark.js',
    output: [
      { name: 'sha', file: './dist-unpackaged/firefox/cs.ark.js', format: 'umd', exports: 'named' }
    ]
  },
  {
    input: './lib/firefox/cs.bokkilden.js',
    output: {
      name: 'sha', file: './dist-unpackaged/firefox/cs.bokkilden.js', format: 'umd', exports: 'named'
    }
  },
  {
    input: './lib/firefox/cs.norli.js',
    output: [
      { name: 'sha', file: './dist-unpackaged/firefox/cs.norli.js', format: 'umd', exports: 'named' }
    ]
  },
  {
    input: './lib/firefox/cs.tronsmo.js',
    output: [
      { name: 'sha', file: './dist-unpackaged/firefox/cs.tronsmo.js', format: 'umd', exports: 'named' }
    ]
  },
  // ######### Firefox clothe stores #########
  {
    input: './lib/firefox/cs.barnashus.js',
    output: {
      name: 'sha', file: './dist-unpackaged/firefox/cs.barnashus.js', format: 'umd', exports: 'named'
    }
  },
  {
    input: './lib/firefox/cs.didriksons.js',
    output: {
      name: 'sha', file: './dist-unpackaged/firefox/cs.didriksons.js', format: 'umd', exports: 'named'
    }
  },
  {
    input: './lib/firefox/cs.gullkorn.js',
    output: {
      name: 'sha', file: './dist-unpackaged/firefox/cs.gullkorn.js', format: 'umd', exports: 'named'
    }
  },
  {
    input: './lib/firefox/cs.kappahl.js',
    output: {
      name: 'sha', file: './dist-unpackaged/firefox/cs.kappahl.js', format: 'umd', exports: 'named'
    }
  },
  {
    input: './lib/firefox/cs.kattnakken.js',
    output: {
      name: 'sha', file: './dist-unpackaged/firefox/cs.kattnakken.js', format: 'umd', exports: 'named'
    }
  },
  {
    input: './lib/firefox/cs.polarnopyret.js',
    output: {
      name: 'sha', file: './dist-unpackaged/firefox/cs.polarnopyret.js', format: 'umd', exports: 'named'
    }
  },
  {
    input: './lib/firefox/cs.reima.js',
    output: {
      name: 'sha', file: './dist-unpackaged/firefox/cs.reima.js', format: 'umd', exports: 'named'
    }
  }
]
