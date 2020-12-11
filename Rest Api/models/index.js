const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {
    bcrypt: { rounds },
} = require('../config');

module.exports = {
    userModel: require('./User')(mongoose, bcrypt, rounds),
    blackListedTokenModel: require('./Token')(mongoose),
    carModel: require('./Car')(mongoose),
};
