const express = require('express');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors')

const authRoutes = require('./routes/auth');
const {SESSION_SECRET, IS_PRODUCTION} =require('./configs');

const app = express();


app.use(express.json({limit: '1KB'}))
app.use(session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      ttl: 14 * 24 * 60 * 60
    })
  }));

app.use(cors({
    origin: 'https://neldrom.github.io',
  }));

app.use('/api/v1/auth', authRoutes)

module.exports = app;