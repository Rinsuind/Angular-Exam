const { isAuth } = require('../utils');
const { home } = require('../middleware');

module.exports = {
    path: '',
    config: (router) => {
        router.route('').get(isAuth(true), home.getSortedData);
        return router;
    },
};
