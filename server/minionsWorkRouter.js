const express = require('express');
const minionsWorkRouter = express.Router();

const {
    createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase,
} = require('./db');

minionsWorkRouter.param('workId', (req, res, next, id) => {
    const work = getFromDatabaseById('work', id)
    if (work){
        req.work = work;
        next();
    }
    else{
        res.status(404).send();
    }
})

minionsWorkRouter.get('/', (req, res, next) => {
    const minionWork = getAllFromDatabase('work').filter(work => {
        return work.minionId === req.minion.id ? work : null;
    });
    res.status(200).send(minionWork);
});

minionsWorkRouter.post('/', (req, res, next) => {
    const newWork = addToDatabase('work', req.body);
    if (newWork) {
        res.status(201).send(newWork);
    }
    else {
        res.status(500).send();
    }
});

minionsWorkRouter.put('/:workId', (req, res, next) => {
    const updatedWork = updateInstanceInDatabase('work', req.body);
    if (updatedWork) {
        res.status(201).send(updatedWork);
    }
    else {
        res.status(500).send();
    }
});

minionsWorkRouter.delete('/:workId', (req, res, next) => {
    const deleteResult = deleteFromDatabasebyId('work', req.work.id)
    if (deleteResult){
        res.status(204).send('OK');
    }
    else{
        res.status(500).send();
    }
})

module.exports = minionsWorkRouter;