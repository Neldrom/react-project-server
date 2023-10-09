const express = require('express');
const expressSession = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(expressSession);
const cors = require('cors')

const authRoutes = require('./routes/auth');
const { SESSION_SECRET, IS_PRODUCTION, MONGODB_URI } = require('./configs');

const app = express();

const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions',
});

store.on('error', (error) => {
    console.error(`Games DB Connection Error: ${error.message}`);
});

store.once('open', () => {
    console.log('Games DB Connected');
});

app.use(express.json({ limit: '1KB' }));

app.use(
    expressSession({
        name: 'dron',
        resave: false,
        saveUninitialized: false,
        secret: SESSION_SECRET,
        cookie: {
            secure: IS_PRODUCTION,
            maxAge: 1000 * 60 * 60 * 24,
        },
        store: store,
    })
);
app.use(cors({
    origin: 'https://neldrom.github.io',
}));

app.use('/api/v1/auth', authRoutes)

module.exports = app;