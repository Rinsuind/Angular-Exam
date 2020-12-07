const { userModel, blackListedTokenModel, carModel } = require('../models');
const { jwt } = require('../utils');
const { formValidator } = require('../utils');
const {
    cookies: { cookieName },
} = require('../config');

module.exports = {
    user: require('./user')(userModel, jwt, cookieName, formValidator, blackListedTokenModel),
    car: require('./car')(carModel, formValidator),
    home: require('./home')(carModel),
};
