const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { tabLog, connectApp, database } = require('./utils');
const routes = require('./routes');

const {
    server: {
        PORT,
        cors: { credentials, urls, exposedHeaders },
    },
    database: { databaseName, connectionString },
} = require('./config');

const app = express();

app.use(cors({ origin: urls, credentials: credentials, exposedHeaders: exposedHeaders }));

app.use(express.static('static'));
app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

routes(app);

database(connectionString, databaseName)
    .catch(tabLog('Error connecting to Database!!!'))
    .then(tabLog(`Successfully connected to Database`))
    .then(connectApp(app, PORT))
    .then(tabLog(`Server is listening on :${PORT}`))
    .catch((err) => console.error(err.message));
