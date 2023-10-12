require('dotenv').config();
const { PORT } = require('./configs');
const express = require('express');
const expressSession = require('express-session');
const MongoStore = require("connect-mongo");
const cors = require('cors');

const authRoutes = require('./routes/auth');
const { SESSION_SECRET, IS_PRODUCTION } = require('./configs');

const app = express();

app.use(express.json({limit: '1KB'}))

app.use(expressSession({
    secret: SESSION_SECRET,
    secure: true,
    saveUninitialized: true,
    resave: false,
    cookie:{
        secure: true,
        maxAge: 1000 * 60 * 60 * 24,
    },
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        touchAfter: 24 * 3600,
    }),
}));
app.use(cors({
    origin: ['http://localhost:3000', 'https://neldrom.github.io'],
    credentials: true,
}));

app.use('/api/v1/auth', authRoutes)

app.listen(PORT, () => {
    console.log(`server started listening on port ${PORT}...`)
})

