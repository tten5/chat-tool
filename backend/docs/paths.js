const rooms = require('./Rooms');
const users = require('./Users');
const messages = require('./Messages');

module.exports = {
    paths: {
        ...rooms,
        ...users,
        ...messages,
    }
}