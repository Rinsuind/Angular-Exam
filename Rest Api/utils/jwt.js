module.exports = function (jwt, secret) {
    function createToken(data) {
        return jwt.sign(data, secret, { expiresIn: '5h' });
    }

    function verifyToken(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, secret, (err, data) => {
                if (err) {
                    return reject(err);
                }
                resolve(data);
            });
        });
    }

    return {
        createToken,
        verifyToken,
    };
};
