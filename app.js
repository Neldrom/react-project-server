const express = require('express');
const expressSession = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(expressSession);
const mongoose = require('mongoose');
const cors = require('cors')

const authRoutes = require('./routes/auth');
const { SESSION_SECRET, MONGODB_URI } = require('./configs');

const app = express();
const sessionStore = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions',
    mongooseConnection: mongoose.createConnection(MONGODB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }),
});

app.use(express.json({ limit: '1KB' }));

app.use(
    expressSession({
        store: sessionStore,
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: true,
            maxAge: 1000 * 60 * 60 * 24,
        },
    })
);

app.use(cors({
    origin: 'https://neldrom.github.io',
}));

app.use('/api/v1/auth', authRoutes)

module.exports = app;