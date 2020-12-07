const { isAuth } = require('../utils');
const { carValidator } = require('../validators');
const { car } = require('../middleware');

module.exports = {
    path: '/car',
    config: (router) => {
        router.route('/create').post(isAuth(), carValidator, car.createCar);
        router.route('/main').get(isAuth(), car.getAllCars);

        return router;
    },
};
