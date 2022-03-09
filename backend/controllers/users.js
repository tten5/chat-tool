const mongodb = require('mongodb')
const { MongoServerError } = mongodb

async function createUser(usersClt, user) {
    console.log('Create new user', user);
    let result 

    try {
        result = await usersClt.insertOne(user);
    } catch (error) {
        if (error instanceof MongoServerError) {
            console.log(`Error worth logging: ${error}`); // special case for some reason
        }
        throw error; // still want to crash
    }
    console.log("Done create new user", user);
    return user
}

async function login(usersClt, userInfo) {
    console.log('Get user', userInfo);
    const { username, password } = userInfo
    let user

    try {
        user = await usersClt.findOne({ username, password });
    } catch (error) {
        if (error instanceof MongoServerError) {
            console.log(`Error worth logging: ${error}`); // special case for some reason
        }
        throw error; // still want to crash
    }
    console.log("Found user", user)
    return user
}

async function getUser(usersClt, username) {
    console.log('Get user', username);
    let user

    try {
        user = await usersClt.findOne({ username });
    } catch (error) {
        if (error instanceof MongoServerError) {
            console.log(`Error worth logging: ${error}`); // special case for some reason
        }
        throw error; // still want to crash
    }
    // console.log("Found user", user)
    return user
}

module.exports = {
    createUser,
    getUser,
    login,
}