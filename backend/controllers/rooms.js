const mongodb = require('mongodb')
const { MongoServerError } = mongodb

async function createRoom(roomsClt, room) {
    console.log('Create new room', room);
    let result;
    try {
        result = await roomsClt.insertOne(room);
    } catch (error) {
        if (error instanceof MongoServerError) {
            console.log(`Error worth logging: ${error}`); // special case for some reason
        }
        throw error; // still want to crash
    }
    console.log('Done create new room', room);
    // console.log('Result is', result);

    return room
}

async function getRoom(roomsClt, roomName) {
    console.log('Get room', roomName);
    let room

    try {
        room = await roomsClt.findOne({ roomName });
    } catch (error) {
        if (error instanceof MongoServerError) {
            console.log(`Error worth logging: ${error}`); // special case for some reason
        }
        throw error; // still want to crash
    }
    console.log("Found room", room)
    return room
}

module.exports = {
    getRoom,
    createRoom
}