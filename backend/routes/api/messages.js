const router = require('express').Router()
const mongodb = require('mongodb')
const { MongoServerError } = mongodb
const { getRoom } = require('../../controllers/rooms')
const { roomsClt, msgsClt } = require('../../models').getDB()

// for when user come back to a room
router.get('/', async (req, res) => {
    const roomName = req.query.roomName
    console.log('Get all messages of room', roomName);
    let msgs;

    const room = await getRoom(roomsClt, roomName)
    if (room) {
        try {
            msgs = await msgsClt.find({roomId: new mongodb.ObjectId(room._id)}).toArray();
        } catch (error) {
        if (error instanceof MongoServerError) {
            console.log(`Error worth logging: ${error}`); // special case for some reason
        }
        throw error; // still want to crash
        }
        res.json(msgs);
    }
    res.status(404).json("Cannot get messages");
})

module.exports = router