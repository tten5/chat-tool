const express = require('express')
const path = require('path')
const http = require('http') 
const socketio = require('socket.io')

// init and connect db
const { runDBInit } = require('./models')

// for auto documentation 
const swaggerUi = require('swagger-ui-express');
const docs = require('./docs');

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const PORT = process.env.PORT || 3000

async function main() {
    // init and connect db
    await runDBInit()
  
    // do interaction with the database here

    // body-parser
    app.use(express.json());

    app.set('io', io) // this line help attaching socket io instance to `req`

    // public dir for frontend
    app.use(express.static(path.join(__dirname, '../vue-ui/dist')));

    app.get('/api/v1/health', (req,res) => {
        res.json("chat-tool is running")
    });

    // set up routes api 
    app.use(require('./routes'));
    
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docs));

    //handling all other request to any route that don't match with any route we have written above
    app.all('*', (req, res, next) => {
        let err = new Error('Page Not Found')
        err.status = 404 
        next(err)
    })

    // error handler setup
    app.use((err, req, res, next) => {
        const { status = 500 } = err // default status is 500
        if(!err.message) err.message = 'Something went wrong' 
        // pass the whole err object to the error.ejs 
        // console.log("ERROR: \n", err)
        res.status(status).json({message: err.message, error: err}) 
    })

    // set up socket server
    const socketHandler = require('./controllers/socket')
    socketHandler(io)

    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })

    return 'Done';

}

main().catch(console.log)
