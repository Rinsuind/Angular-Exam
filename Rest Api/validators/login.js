module.exports = function (body) {
    return [
        body('email', 'Invalid Email!').isEmail().normalizeEmail(),
        body('password').custom((x) => {
            if (x.length < 6) {
                return Promise.reject('Password must be at least six characters!');
            }
            return true;
        }),
    ];
};
