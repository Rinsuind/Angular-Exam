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

    function getAllCars(req, res, next) {
        return carModel
            .find({})
            .then((cars) => res.status(200).json(cars))
            .catch((err) => res.status(400).json({ message: err }));
    }

    function getCarDetails(req, res, next) {
        return carModel
            .findById({ _id: req.params.id })
            .then((car) => res.status(200).json(car))
            .catch((err) => res.status(400).json({ message: err.message }));
    }

    function updateCar(req, res, next) {
        const err = formValidator(req);

        if (err) {
            return res.status(400).json(err);
        }

        return carModel
            .updateOne({ _id: req.params.id }, { $set: req.body })
            .then((_) => res.status(201).json({ message: 'Updated' }))
            .catch((err) => res.status(400).json({ message: err.message }));
    }
    return { createCar, getAllCars, getCarDetails, updateCar };
};
