const router = require('express').Router();
const mongodb = require('mongodb')
const { MongoServerError } = mongodb
const { createUser, login } = require('../../controllers/users')
const { usersClt } = require('../../models').getDB()

// create new user
router.post('/register', async (req, res) => {
    const user = req.body.user;
    await createUser(usersClt, user)
    res.json({ message: "successfully register user", username: user.username });
});

// login
router.post('/login', async (req, res) => {
    const {username, password} = req.body.user;
    const user = await login(usersClt, {username, password})
    if (user == null) {
        console.log("incorrect name or password")
        res.json({message: "incorrect name or password"})
    }
    res.json({message: "successfully login", username: user.username });
});

module.exports = router;