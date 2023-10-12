const bcrypt = require('bcrypt')
const _ = require('lodash')

const { User, Game } = require('../modules/user');
const registerValidator = require('../validators/register');
const loginValidator = require('../validators/login');
const { dbSecretFields } = require('../configs');


exports.register = async (req, res) => {
    const validationResult = registerValidator(req.body);
    if (validationResult !== true) {
        return res.status(400).json({ message: validationResult })
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const user = await User.create({ ...req.body, password: hashedPassword });

    req.session.userId = user.id;

    return res
        .status(201)
        .json({
            message: 'you are registered successfully',
            user: _.omit(user.toObject(), dbSecretFields)
        });
};

exports.login = async (req, res) => {
    console.log(req.body);
    const validationResult = loginValidator(req.body);
    if (validationResult !== true) {
        return res.json({ message: "validation error" })
    }
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
        return res.json({ message: "Username does not exists." });
    }

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordCorrect) {
        return res.json({ message: "Password is not correct." })
    }

    req.session.userId = user.id;
    console.log(user.id);
    res.json({ message: "You are successfully logged in." });
}

exports.logout = (req, res) => {
    delete req.session.userId;
    res.json({ message: 'You are successfully logged out' });
}

exports.loginRequired = async (req, res, next) => {
    if (!req.session || !req.session.userId) {
        return res.json({ message: 'You should login for acess to this route' });
    }
    req.user = await User.findById(req.session.userId);
    if (!req.user) {
        return res.json({ message: "This user id no longer exists" })
    }
    next();
}
exports.loginStatus = async (req,res) => {
    if(!req.session || !req.session.userId){
        return res.json({status: false});
    }
    req.user = await User.findById(req.session.userId);
    if (!req.user) {
        return res.json({status: false});
    }
    else{
        return res.json({status: true});
    }
}
exports.profile = (req, res) => {
    res.json({ user: _.omit(req.user.toObject(), dbSecretFields) })
}

exports.loadGames = async (req, res) => {
    function compareId(a, b) { return a.id - b.id; }
    try {
        const games = await Game.find({},'-_id');
        games.sort(compareId);
        res.json(games);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
}

exports.loadUserGames = async (req, res) => {
    try {
        const user = await User.findById(req.session.userId);
        res.json(user.games);
    } catch (error) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
}

exports.addGame = async (req, res) => {
    const { title, minPlayers, maxPlayers, gameType } = req.body;

    const game = new Game({
        id: 0,
        title: title,
        game_type: gameType,
        pack_number: 0,
        min_players: minPlayers,
        max_players: maxPlayers,
    });
    try {
        const user = await User.findById(req.session.userId);

        user.games.push(game);

        await user.save();

        return res.json({ message: 'Game added successfully', user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

exports.deleteGame = async (req, res) => {
    try {
        const user = await User.findById(req.session.userId);
        user.games = user.games.filter((item) => item.title !== req.params.title);
        
        await user.save();
        return res.json({ message: 'Game deleted successfully', user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}