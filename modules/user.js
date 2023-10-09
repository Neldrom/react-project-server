const mongoose = require('mongoose');
const {connectDBs} = require('../dbs/db');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    games: Array
},
    { timestamps: true }
);

const gameSchema = new mongoose.Schema({
    id: Number,
    title: String,
    min_players: Number,
    max_players: Number,
    game_type: String,
    pack_number: Number
  });


const {gamesDb, userDb} = connectDBs();

const User = userDb.model('user', userSchema);
const Game = gamesDb.model('game', gameSchema);

module.exports = {User, Game};