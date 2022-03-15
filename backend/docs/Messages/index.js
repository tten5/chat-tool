const getMessages = require('./getMessages');

module.exports = {
    '/api/msgs': {
        ...getMessages,
    },
}