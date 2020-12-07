module.exports = function (userModel, jwt, cookieName, formValidator, blackListTokenModel) {
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
        const createdAt = new Date();
        const err = formValidator(req);
        if (err) {
            return res.status(400).json(err);
        }
        return userModel
            .create({ ...req.body, createdAt })
            .then((_) => res.status(201).json({ message: 'User has been created successfully.' }))
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

    return {
        register,
        login,
        logout,
    };
};