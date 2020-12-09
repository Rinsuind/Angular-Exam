module.exports = function (body) {
    return [
        body('firstName').custom((x) => {
            const pattern = /^([A-Z]{1})([a-z]{1,10})$/g;
            if (!pattern.test(x)) {
                return Promise.reject('Invalid Name!');
            }
            return true;
        }),

        body('lastName').custom((x) => {
            const pattern = /^([A-Z]{1})([a-z]{1,10})$/g;
            if (!pattern.test(x)) {
                return Promise.reject('Invalid Name');
            }
            return true;
        }),

        body('street').custom((x) => {
            if (x.length < 1) {
                return Promise.reject('Street field is required!');
            }
            return true;
        }),
        body('zip').custom((x) => {
            if (x < 1 || x === undefined) {
                return Promise.reject('Invalid Zip Filed!');
            }
            return true;
        }),
        body('city').custom((x) => {
            if (x.length < 1) {
                return Promise.reject('City Field can not be Empty!');
            }
            return true;
        }),
        body('country').custom((x) => {
            if (x.length < 1) {
                return Promise.reject('Country Field Can Not be Empty!');
            }
            return true;
        }),
    ];
};
