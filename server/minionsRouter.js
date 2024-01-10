const express = require('express');
const minionsRouter = express.Router();
//const {
//    createMeeting,
//    getAllFromDatabase,
//    getFromDatabaseById,
//    addToDatabase,
//    updateInstanceInDatabase,
//    deleteFromDatabasebyId,
//    deleteAllFromDatabase,
//} = require('./db');

minionsRouter.get('/', (req, res, next) => {
    const allMinions = ''//getAllFromDatabase('minions');
    if (allMinions)
        res.status(200).send(allMinions)
    else
        res.status(404).send('Error: System error.')
});

module.exports = minionsRouter;