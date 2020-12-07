const { body } = require('express-validator');

module.exports = {
    registerValidator: require('./register')(body),
    loginValidator: require('./login')(body),
    carValidator: require('./car')(body),
};
