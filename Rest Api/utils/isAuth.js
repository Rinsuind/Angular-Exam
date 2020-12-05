module.exports = function (jwt, cookieName, userModel, blackListedModel) {
    return function (check = true) {
        return function (req, res, next) {
            const token = req.cookies[cookieName] || '';

            // Postman testing...
            //const token = req.headers.authorization.split(' ')[1];

            return Promise.all([jwt.verifyToken(token), blackListedModel.findOne({ token })]).then(
                ([data, blackToken]) => {
                    if (blackToken) {
                        return Promise.reject(res.json({ message: 'Blacklisted Token' }));
                    }
                    userModel
                        .findById(data.id)
                        .then((user) => {
                            req.user = user;
                            next();
                        })
                        .catch((err) => {
                            if (!check) {
                                return next();
                            }
                            if (['token expired', 'blacklisted token', 'jwt must be provided'].includes(err.message)) {
                                console.log(err.message);
                                return res.status(400).json({ message: 'Invalid Token!!!' });
                            }
                            next(err);
                        });
                }
            );
        };
    };
};
