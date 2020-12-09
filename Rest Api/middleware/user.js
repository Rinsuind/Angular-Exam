module.exports = function (userModel, jwt, cookieName, formValidator, blackListTokenModel, carModel) {
    function login(req, res, next) {
        const { email, password } = req.body;

        const err = formValidator(req);

        if (err) {
            return res.status(400).json(err);
        }

        return userModel.findOne({ email }).then((user) => {
            return Promise.all([user, user ? user.passwordMatch(password) : undefined]).then(([user, match]) => {
                if (!match) {
                    return res.status(400).send({ message: 'Wrong username or password' });
                }

                const token = jwt.createToken({ id: user._id });
                const { _id, email, username } = user;
                const resUser = { _id, email, username, token };

                return res.cookie(cookieName, token, { httpOnly: true }, { maxAge: 3600000 }).status(200).json({ resUser });
            });
        });
    }
    function register(req, res, next) {
        const err = formValidator(req);
        if (err) {
            return res.status(400).json(err);
        }

        return userModel
            .findOne({ email: req.body.email })
            .then((user) => {
                if (user) {
                    return res.status(400).json({ message: `The email ${user.email} is already in the system!` });
                }
                return userModel
                    .create({ ...req.body })
                    .then((_) => res.status(201).json({ message: 'User has been created successfully.' }))
                    .catch((err) => res.status(400).json({ message: err.message }));
            })
            .catch((err) => res.status(400).json({ message: err.message }));
    }

    function logout(req, res, next) {
        const token = req.cookies[cookieName] || '';
        req.user = null;
        return blackListTokenModel
            .create({ token })
            .then((_) => {
                res.clearCookie(cookieName).status(200).json({ message: 'Successfully logged Out!' });
            })
            .catch((err) => res.status(403).json({ message: err.message }));
    }

    function profile(req, res, next) {
        return Promise.all([userModel.findById({ _id: req.user.id }), carModel.find({ creator: req.user.id })])
            .then(([user, cars]) => {
                const { email, username, carsBought } = user;
                const resObj = { email, username, carsBought, cars };
                return res.status(200).json(resObj);
            })
            .catch((err) => res.status(400).json({ message: err.message }));
    }

    return {
        register,
        login,
        logout,
        profile,
    };
};
