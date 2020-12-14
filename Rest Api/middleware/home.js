module.exports = function (carModel) {
    function getSortedData(req, res, next) {
        return !req.user
            ? carModel
                  .find({})
                  .sort({ brand: 1, likes: -1 })
                  .then((cars) => res.status(200).json(cars))
                  .catch((err) => res.status(400).json({ message: err.message }))
            : '';
    }

    return {
        getSortedData,
    };
};
