const Validator = require('fastest-validator');

const v = new Validator();

const schema = {
    username: {type: 'string', min: 3, max:20},
    password: {type: 'string'},
    name: {type: "string", min: 3, max:60},
    $$strict: true,
};

const checker = v.compile(schema);

module.exports = checker