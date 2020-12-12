const { isAuth } = require('../utils');
const { carValidator } = require('../validators');
const { car } = require('../middleware');

module.exports = {
    path: '',
    config: (router) => {
        router.route('/create').post(isAuth(), carValidator, car.createCar);
        router.route('/main').get(isAuth(), car.getAllCars);
        router.route('/detail/:id').get(isAuth(), car.getCarDetails);
        router.route('/edit/:id').patch(isAuth(), carValidator, car.updateCar);
        router.route('/delete/:id').delete(isAuth(), car.deleteCar);
        router.route('/like').patch(isAuth(), car.likeCar);
        router.route('/dislike').patch(isAuth(), car.dislikeCar);
        router.route('/my-offers').get(isAuth(), car.userOffers);

        return router;
    },
};
