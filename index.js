const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { port, dbURI } = require('./config/environment');

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.json());
app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.listen(port, () => console.log(`Express running on port ${port}`));

module.exports = app;
