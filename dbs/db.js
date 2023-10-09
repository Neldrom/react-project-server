const mongoose = require('mongoose');
const expressSession = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(expressSession);
const {connectDBs} = require('../dbs/db');
require('dotenv').config()

const GAME_URI = process.env.GAME_URI;
const USERS_URI = process.env.USERS_URI;
const MONGODB_URI = process.env.MONGODB_URI;

const connectDBs = () => {
    try {
        const sessionStore = new MongoDBStore({
            uri: MONGODB_URI,
            collection: 'sessions',
            mongooseConnection: mongoose.createConnection(MONGODB_URI, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
            }),
        });
        const gamesDb = mongoose.createConnection(GAME_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        const userDb = mongoose.createConnection(USERS_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        return { gamesDb, userDb, sessionStore }
    } catch (error) {
        console.error(`Error:${error.message}`)
        process.exit(1)
    }
}

module.exports = { connectDBs }