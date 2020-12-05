const { snakeCase } = require('lodash');
const express = require('express');
const fs = require('fs');
const pathModule = require('path');

module.exports = (app) => {
    fs.readdirSync(__dirname).forEach((file) => {
        if (file === 'index.js') {
            return;
        }
        const router = express.Router();
        const routeModule = require(pathModule.join(__dirname, file));
        const modulePath = routeModule.path ? `/api${routeModule.path}` : routeModule.path;
        const path = modulePath || '/api/' + (file !== 'home.js' ? snakeCase(file.replace('.js', '')) : '');
        const route = routeModule.config ? routeModule.config(router) : routeModule(router);

        app.use(path, route);
    });
};
