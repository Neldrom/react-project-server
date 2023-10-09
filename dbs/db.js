const mongoose = require('mongoose')
require('dotenv').config()

const GAME_URI = process.env.GAME_URI;
const USERS_URI = process.env.USERS_URI;

const connectDBs = () => {
    try {
        const gamesDb = mongoose.createConnection(GAME_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        const userDb = mongoose.createConnection(USERS_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        return { gamesDb, userDb }
    } catch (error) {
        console.error(`Error:${error.message}`)
        process.exit(1)
    }
}

module.exports = { connectDBs }