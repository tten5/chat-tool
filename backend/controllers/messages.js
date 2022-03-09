const mongodb = require('mongodb')
const { MongoServerError } = mongodb

async function createMsg(msgsClt, msg) {
    console.log('Create new msg', msg);
    let result 

    try {
        result = await msgsClt.insertOne(msg);
    } catch (error) {
        if (error instanceof MongoServerError) {
            console.log(`Error worth logging: ${error}`); // special case for some reason
        }
        throw error; // still want to crash
    }
    console.log("Done create new msg", msg);
    return msg
}

function formatMessage(sender, content) {
    return {
      sender,
      content,
    };
  }

module.exports = {
    createMsg,
    formatMessage
}