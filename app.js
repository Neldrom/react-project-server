const express = require('express');
const expressSession = require('express-session');
const cors = require('cors');
const {SESSION_SECRET, IS_PRODUCTION} =require('./configs');

const app = express();

app.use(cors({
    origin: ['http://localhost:3000', 'https://neldrom.github.io'],
    credentials: true,
}));

app.use(express.json({limit: '1KB'}))
app.use(
    expressSession({
        name: "dron",
        resave: false,
        saveUninitialized: true,
        secret: SESSION_SECRET,
        cookie:{
            secure: IS_PRODUCTION,
            maxAge: 1000 * 60 * 60 * 24,
        },
        secure: false
    })
)

const authRoutes = require('./routes/auth');
app.use('/api/v1/auth', authRoutes)

module.exports = app;