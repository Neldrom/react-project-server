exports.PORT = process.env.PORT || 5000;
exports.dbSecretFields = ["__v", "password"];
exports.SESSION_SECRET = process.env.SESSION_SECRET;
exports.IS_PRODUCTION = process.env.NODE_ENV === "production";
exports.GAME_URI = process.env.GAME_URI;
exports.USERS_URI = process.env.USERS_URI;