const express = require('express');
const apiRouter = express.Router();
const minionsRouter = require('./minionsRouter');

apiRouter.use('/minions', minionsRouter);

module.exports = apiRouter;
