module.exports = function (body) {
    return [
        body('brand').custom((x) => {
            const pattern = /^[a-zA-Z]{2,25}$/gm;
            if (x.length < 1) {
                return Promise.reject('Brand Field Can Not Be Empty!');
            }
            if (!pattern.test(x)) {
                return Promise.reject('Invalid Credentials!');
            }
            return true;
        }),

        body('model').custom((x) => {
            if (x.length < 1) {
                return Promise.reject('Model Can Not Be Empty!');
            }
            return true;
        }),
        body('year').custom((x) => {
            if (isNaN(x)) {
                return Promise.reject('Year must be a Number!');
            }
            if (x < 1900 || x > 2021) {
                return Promise.reject('Invalid Year!');
            }
            return true;
        }),

        body('engine').custom((x) => {
            const x1 = x.toLowerCase();
            if (x.length < 1) {
                return Promise.reject('Engine Field Can Not Be Empty!');
            }
            if (x1 !== 'diesel' && x1 !== 'petrol' && x1 !== 'hybrid' && x1 !== 'electric') {
                return Promise.reject('Invalid Type!!!');
            }
            return true;
        }),

        body('enginePower').custom((x) => {
            if (isNaN(x)) {
                return Promise.reject('Field must be a Number!');
            }
            return true;
        }),

        body('engineCapacity').custom((x) => {
            if (isNaN(x)) {
                return Promise.reject('Field must be a Number!');
            }
            return true;
        }),

        body('transmission').custom((x) => {
            const x1 = x.toLowerCase();
            if (x.length < 1) {
                return Promise.reject('Transmission Field Can Not be Empty!');
            }
            if (x1 !== 'manual' && x1 !== 'automatic' && x1 !== 'semi-automatic') {
                return Promise.reject('Invalid Credentials');
            }
            return true;
        }),
        body('price').custom((x) => {
            if (isNaN(x)) {
                return Promise.reject('Price Must be a Number');
            }
            if (x < 0) {
                return Promise.reject('Price Can Not be Negative Number');
            }
            return true;
        }),
    ];
};
