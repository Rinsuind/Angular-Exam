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

    function deleteCar(req, res, next) {
        const { id } = req.params;
        console.log(id);
        return carModel
            .deleteOne({ _id: id })
            .then((_) => res.status(200).json({ message: 'Deleted' }))
            .catch((err) => res.status(400).json({ message: err.message }));
    }

    function likeCar(req, res, next) {
        const { id } = req.body;
        return carModel
            .updateOne({ _id: id }, { $push: { likes: req.user.id } })
            .then((_) => res.status(200).json({ message: 'Updated' }))
            .catch((err) => res.status(400).json({ message: err.message }));
    }
    function dislikeCar(req, res, next) {
        const { id } = req.body;
        return carModel
            .updateOne({ _id: id }, { $pull: { likes: req.user.id } }, { safe: true, upsert: true })
            .then((_) => res.status(200).json({ message: 'Updated' }))
            .catch((err) => res.status(400).json({ message: err.message }));
    }
    return { createCar, getAllCars, getCarDetails, updateCar, deleteCar, likeCar, dislikeCar };
};
