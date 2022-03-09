const { getUser } = require('./users')
const { getRoom } = require('./rooms')
const { createMsg, formatMessage } = require('./messages')
const { roomsClt, usersClt, msgsClt } = require('../models').getDB()

const botName = 'Server Bot'

function socketHandler(io) {
    // Run when socket client connects 
    io.on('connection', (socket) => {

        console.log(`socket ${socket.id} is connected`)

        // When someone join a chat room
        socket.on('joinroom', async ({ username, roomName }) => {
            
            console.log(`user ${username} has joined room ${roomName} `)
            const user = await getUser(usersClt, username)
            const room = await getRoom(roomsClt, roomName)

            // Join user into the room
            socket.join(room.roomName)

            // send msg to welcome current user
            socket.emit('server-msg', formatMessage(botName, `Welcome to chatRoom ${roomName}`))

            // Broadcast to other users in the room when a user connects
            socket.broadcast.to(room.roomName).emit(
                'server-msg',
                formatMessage(botName, `${user.username} has joined the chat`))
            
        })

        // Listen for msg from user 
        socket.on('client-msg', async ({ username, roomName, msgContent, isShown}) => {
            // get current user who sends the chatMessage
            const user = await getUser(usersClt, username)
            const room = await getRoom(roomsClt, roomName)
            
            if (room  && user ) {
                const msg = {
                    roomId: room._id,
                    userId: user._id,
                    sender: user.username,  
                    content: msgContent,
                    isShown 
                }

                await createMsg(msgsClt, msg)
                
                // Notify to all users of the room (include sender)
                io.to(roomName).emit('chat-msg', msg)
            } else {
                io.to(roomName).emit('server-msg', formatMessage(botName, "Error sending message"))
            }
        })

        socket.on('leftroom', async ({username, roomName}) => {
            console.log(`user ${username} has left room ${roomName} `)
            const user = await getUser(usersClt, username)
            const room = await getRoom(roomsClt, roomName)
            if(user && room) {
                console.log(`user ${user.username} has left room ${room.roomName}`)
                io.to(room.roomName).emit(
                    'server-msg', 
                    formatMessage(botName, `${user.username} has left the chat`))
            }
        })

        // Runs when mongoClient disconnect 
        socket.on('disconnect', () => {
            // remove user from user lists
            console.log(`socket ${socket.id} has disconnected`)
        })
    })
}

module.exports = socketHandler