module.exports = function (body) {
    return [
        body('email', 'Invalid Email!').isEmail().normalizeEmail(),
        body('username').custom((x) => {
            const pattern = /^\w+$/gm;
            if (x.length < 2) {
                return Promise.reject('Username must be at least two characters!');
            }

            if (!pattern.test(x)) {
                return Promise.reject("Username must contains only letter's or digits!");
            }
            return true;
        }),
        body('password').custom((x) => {
            if (x.length < 6) {
                return Promise.reject('Password must be at least six characters long!');
            }
            return true;
        }),

        body('rePassword').custom((x, { req }) => {
            if (x !== req.body.password) {
                return Promise.reject('Passwords Do Not match!');
            }
            return true;
        }),
    ];
};
