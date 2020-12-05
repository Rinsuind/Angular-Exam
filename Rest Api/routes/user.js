const { userModel } = require('../models');
const { isAuth } = require('../utils');
const { user } = require('../middleware');
const { registerValidator, loginValidator } = require('../validators');

module.exports = {
    path: '',
    config: (router) => {
        router.route('/register').post(registerValidator, user.register);
        router.route('/login').post(loginValidator, user.login);
        router.route('/logout').get(isAuth(), user.logout);

        return router;
    },
};
