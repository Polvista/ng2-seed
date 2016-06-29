switch (process.env.NODE_ENV) {
    case 'server':
        module.exports = require('./config/webpack.server');
        break;
    case 'prod':
    case 'production':
        module.exports = require('./config/webpack.prod');
        break;
    case 'dev':
    case 'development':
    default:
        module.exports = require('./config/webpack.dev');
}
