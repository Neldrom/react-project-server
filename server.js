require('dotenv').config();
const mongoose = require('mongoose')
const { PORT } = require('./configs');
const express = require('express');
const expressSession = require('express-session');
const MongoStore = require("connect-mongo");
const cors = require('cors')
const bodyParser = require("body-parser");

const authRoutes = require('./routes/auth');
const { SESSION_SECRET } = require('./configs');

const app = express();

app.use(cors({
    origin: ['http://localhost:3000', 'https://neldrom.github.io'],
}));

app.use(bodyParser.json({ type: 'application/*+json' }))


app.use(expressSession({
    secret: SESSION_SECRET,
    secure: true,
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        touchAfter: 24 * 3600,
    }),
}));

app.use('/api/v1/auth', authRoutes)

app.listen(PORT, () => {
    console.log(`server started listening on port ${PORT}...`)
})