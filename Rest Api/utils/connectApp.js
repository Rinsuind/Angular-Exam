module.exports = function appListen(app, PORT) {
    return new Promise((resolve, reject) => {
        app.listen(PORT, function () {
            resolve();
        });
    });
};
