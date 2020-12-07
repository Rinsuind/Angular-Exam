const { isAuth } = require('../utils');

module.exports = {
    path: '/',
    config: (router) => {
        router.route('/').get(isAuth(true));
        return router;
    },
};
