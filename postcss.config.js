/*
 * PostCSS options
 */
const _ = require('lodash');

// Parse config
let config,
  localConf,
  globalConf = require('./config.js')
try {
  localConf = require('./local.config.js')
} catch (e) {
  localConf = {}
}

config = _.merge(globalConf, localConf)

module.exports = (devEnv) => {
  let postCSSPlugins
  if (devEnv) {
    postCSSPlugins = [
      require('postcss-preset-env')()
    ]
  } else {
    postCSSPlugins = [
      require('postcss-preset-env')(),
      require('cssnano')({
        preset: 'cssnano-preset-default'
      })
    ]
  }
  return {
    sourceMap: true,
    plugins: postCSSPlugins
  }
}
