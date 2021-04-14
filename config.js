const path = require('path'),
      NODE_ENV = process.env.NODE_ENV,
      devEnv = NODE_ENV === 'development'

// Local settings
let localSettings = {}
try {
  localSettings = require('./local.config.js')
} catch (e) {
  console.log(e)
  localSettings = {}
}

const settings = {
  entryPoints: require('./entry_points.js'),
  outputPath: path.resolve(__dirname, 'dist/'),
  publicPath: '/static/',
  aliases: require('./aliases.js'),
  bundles: {
    jsOutput: 'js/[name].js',
    cssOutput: 'css/[name].css'
  }
}

const _ = require('lodash')

module.exports = _.merge(settings, localSettings)
