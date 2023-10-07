const express = require('express');

const router = express.Router();

const {register,login, logout, loginRequired,profile, loadGames, addGame, deleteGame, loadUserGames, loginStatus} = require("../controllers/auth")

router.post('/register', register);
router.post('/login', login);
router.post('/logout', loginRequired, logout);
router.get('/profile', loginRequired, profile);
router.get('/loadGames', loadGames);
router.post('/addGame', loginRequired, addGame);
router.delete('/deleteGame/:title' , loginRequired, deleteGame);
router.get('/loadUserGames', loginRequired, loadUserGames);
router.get('/loginStatus', loginStatus)

module.exports = router;