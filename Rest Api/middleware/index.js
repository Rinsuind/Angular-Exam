const { userModel, blackListedTokenModel, carModel, addressModel } = require('../models');
const { jwt } = require('../utils');
const { formValidator } = require('../utils');
const {
    cookies: { cookieName },
} = require('../config');

module.exports = {
    user: require('./user')(userModel, jwt, cookieName, formValidator, blackListedTokenModel, carModel, addressModel),
    car: require('./car')(carModel, formValidator),
    home: require('./home')(carModel),
};
