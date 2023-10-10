const express = require('express');
const expressSession = require('express-session');
const MongoStore = require("connect-mongo");
const cors = require('cors')

const authRoutes = require('./routes/auth');
const { SESSION_SECRET } = require('./configs');

const app = express();

app.use(expressSession({
  secret: 'keyboard cat',
  saveUninitialized: false, 
  resave: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    touchAfter: 24 * 3600 
  })
}));
app.use(cors({
  origin: 'https://neldrom.github.io',
}));

app.use('/api/v1/auth', authRoutes)

module.exports = app;