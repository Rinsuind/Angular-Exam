module.exports = function (carModel, formValidator) {
    function createCar(req, res, next) {
        const err = formValidator(req);

        if (err) {
            return res.status(400).json(err);
        }

        return carModel
            .create({ ...req.body, creator: req.user.id })
            .then((_) => res.status(201).json({ message: 'A new car is add successfully' }))
            .catch((err) => res.status(400).json({ message: err.message }));
    }
    return { createCar };
};
