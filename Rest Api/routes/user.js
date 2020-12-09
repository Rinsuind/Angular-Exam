const { isAuth } = require('../utils');
const { user } = require('../middleware');
const { registerValidator, loginValidator } = require('../validators');

module.exports = {
    path: '',
    config: (router) => {
        router.route('/register').post(registerValidator, user.register);
        router.route('/login').post(loginValidator, user.login);
        router.route('/logout').get(isAuth(), user.logout);
        router.route('/profile').get(isAuth(), user.profile);

        return router;
    },
};
