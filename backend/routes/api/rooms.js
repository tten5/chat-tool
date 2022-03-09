const router = require('express').Router();
const mongodb = require('mongodb')
const { MongoServerError } = mongodb
const { getRoom, createRoom } = require('../../controllers/rooms')
const { roomsClt, msgsClt } = require('../../models').getDB()

// get all rooms
router.get('/', async (req, res) => {
    console.log('Get all rooms');
    let rooms;

    try {
        rooms = await roomsClt.find({}).toArray();
    } catch (error) {
    if (error instanceof MongoServerError) {
        console.log(`Error worth logging: ${error}`); // special case for some reason
    }
    throw error; // still want to crash
    }

    res.json(rooms);
});

// create new room
router.post('/', async (req, res) => {
    console.log('Create new room');
    const room = req.body.room;
    await createRoom(roomsClt, room)
    res.json({message: "successfully create new room", room });
});

// delete room
router.delete('/:roomName', async (req, res) => {
    const roomName = req.params.roomName;
    
    console.log('Delete room', roomName)
    const room = await getRoom(roomsClt, roomName)
    if (room) {
        try {
            await roomsClt.deleteOne({ roomName });
            console.log(room._id)

            // delete all msgs inside that room
            const result = await msgsClt.deleteMany({ roomId: new mongodb.ObjectId(room._id)})
            
            console.log(result)

            } catch (error) {
                if (error instanceof MongoServerError) {
                    console.log(`Error worth logging: ${error}`); // special case for some reason
                }
                throw error; // still want to crash
            }
            req.app.get('io').to(roomName).emit('delete-room')
            res.json("successfully delete room");
    }
    else {
        res.json("cannot delete room")
    }
});

module.exports = router
