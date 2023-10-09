const express = require('express');
const expressSession = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(expressSession);
const cors = require('cors')

const authRoutes = require('./routes/auth');
const {SESSION_SECRET, USERS_URI} =require('./configs');

const app = express();
const sessionStore = new MongoDBStore({
    uri: USERS_URI, 
    collection: 'sessions',
  });

app.use(express.json({limit: '1KB'}))
app.use(
    expressSession({
        name: "dron",
        resave: false,
        saveUninitialized: false,
        secret: SESSION_SECRET,
        cookie:{
            secure: true,
            maxAge: 1000 * 60 * 60 * 24,
        },
        store: sessionStore
    })
)
app.use(cors({
    origin: 'https://neldrom.github.io',
  }));

app.use('/api/v1/auth', authRoutes)

module.exports = app;