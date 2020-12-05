const mongoose = require('mongoose');

module.exports = function connectDataBase(connectionString, databaseUrl) {
    return mongoose.connect(`${connectionString}${databaseUrl}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    });
};
