require('dotenv').config();
const { PORT } = require('./configs');
const express = require('express');
const expressSession = require('express-session');
const MongoStore = require("connect-mongo");
const cors = require('cors');

const authRoutes = require('./routes/auth');
const { SESSION_SECRET, IS_PRODUCTION } = require('./configs');

const app = express();
app.set("trust proxy", true);
app.use(express.json({limit: '1KB'}))

app.use(expressSession({
    name: "dron",
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      httpOnly: false,
      sameSite: "none",
      maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        touchAfter: 24 * 3600,
    }),
}));
const allowedOrigins = ['http://localhost:3000', 'https://neldrom.github.io'];

app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, 
}));

app.use('/api/v1/auth', authRoutes)

app.listen(PORT, () => {
    console.log(`server started listening on port ${PORT}...`)
})

