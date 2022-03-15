const getRooms = require('./getRooms');
const createRoom = require('./createRoom');
const deleteRoom = require('./deleteRoom');

module.exports = {
    '/api/rooms': {
        ...getRooms,
        ...createRoom
    },
    '/api/rooms/{roomName}': {
        ...deleteRoom
    }
}