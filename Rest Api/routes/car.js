const { isAuth } = require('../utils');

module.exports = {
    path: '/car',
    config: (router) => {
        router.route('/create').get(isAuth(), (req, res, next) => {
            return Promise.resolve(res.status(200).json({ message: 'Valid Auth' }));
        });
        return router;
    },
};
