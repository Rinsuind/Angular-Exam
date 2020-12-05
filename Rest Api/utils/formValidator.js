module.exports = function (resultValidator) {
    return function (req) {
        const err = resultValidator(req);
        if (!err.isEmpty()) {
            return { message: `${err.array()[0].msg}` };
        }
        return false;
    };
};
