const path = require('path'),
      NODE_ENV = process.env.NODE_ENV,
      devEnv = NODE_ENV === 'development';

const settings = {
	publicPath: '/fe-bootstrap/'
}
module.exports = settings
