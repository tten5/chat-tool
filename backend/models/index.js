const mongodb = require('mongodb')
const { MongoClient } = mongodb
const { config } = require('../config')

// create database mongoClient
const mongoClient = new MongoClient(config.DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Database Name
const dbName = 'chat-tool';

async function init() {
  try {
    // Connect the client to the server
    await mongoClient.connect();
    console.log('Connected successfully to MongoDB server');

    const db = mongoClient.db(dbName);
    const roomsClt = db.collection('rooms');
    const msgsClt = db.collection('messages');
    const usersClt = db.collection('users');

    return {
      db,
      roomsClt,
      msgsClt,
      usersClt
    }
  }
  catch (err) {
    console.err(err)
  }
}

let dbInit = null

async function runDBInit() {
  dbInit = await init()
  console.log("dbInit ready")
}

function getDB() {
  if (dbInit) return dbInit
  else return {
    db: null,
    roomsClt: null,
    msgsClt: null,
    usersClt: null
  }
}

module.exports = {
    runDBInit,
    getDB
}