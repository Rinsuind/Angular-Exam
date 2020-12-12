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
                const { email, username, carsBought, carsChecked } = user;
                const resObj = { email, username, carsBought, carsChecked, cars };
                return res.status(200).json(resObj);
            })
            .catch((err) => res.status(400).json({ message: err.message }));
    }

    function checkCar(req, res, next) {
        return userModel
            .updateOne({ _id: req.user.id }, { $push: { carsChecked: req.params.id } })
            .then((_) => {
                return userModel.findById({ _id: req.user.id }).then((user) => res.status(201).json({ data: user.carsChecked.length }));
            })
            .catch((err) => res.status(400).json({ message: err.message }));
    }

    function checkOut(req, res, next) {
        return userModel
            .findById({ _id: req.user.id })
            .populate('carsChecked')
            .then((result) => res.status(200).json(result))
            .catch((err) => res.status(400).json({ message: err.message }));
    }

    function delItem(req, res, next) {
        const { _id } = req.body;

        return userModel
            .updateOne({ _id: req.user.id }, { $pull: { carsChecked: _id } })
            .then((_) => res.status(200).json({ message: 'Deleted!' }))
            .catch((err) => res.status(400).json({ message: err.message }));
    }

    function buyCars(req, res, next) {
        return userModel
            .updateOne({ _id: req.user.id }, { $inc: { carsBought: req.body.length }, $set: { carsChecked: [] } })
            .then((_) => res.status(200).json({ message: 'Updated' }))
            .catch((err) => res.status(400).json({ message: err.message }));
    }

    return {
        register,
        login,
        logout,
        profile,
        checkCar,
        checkOut,
        delItem,
        buyCars,
    };
};
