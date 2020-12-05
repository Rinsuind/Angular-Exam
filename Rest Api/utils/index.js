const jwt1 = require('jsonwebtoken');
const { userModel, blackListedTokenModel } = require('../models');
const { validationResult } = require('express-validator');

const {
    cookies: { secret, cookieName },
} = require('../config');

const jwt = require('./jwt')(jwt1, secret);

module.exports = {
    tabLog: require('./tabLog'),
    connectApp: require('./connectApp'),
    database: require('./database'),
    jwt,
    isAuth: require('./isAuth')(jwt, cookieName, userModel, blackListedTokenModel),
    formValidator: require('./formValidator')(validationResult),
};
