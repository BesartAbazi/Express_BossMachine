const express = require('express');
const minionsRouter = express.Router();
const {
    createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase,
} = require('./db');

minionsRouter.param('id', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if (minion){
        req.minion = minion;
        next();
    }
    else{
        res.status(404).send('Error: Unknown minion id.');
    }
});

minionsRouter.get('/', (req, res, next) => {
    const allMinions = getAllFromDatabase('minions');
    if (allMinions)
        res.status(200).send(allMinions)
    else
        res.status(404).send('Error: System error.')
});

minionsRouter.get('/:id', (req, res, next) => {
    res.status(200).send(req.minion);
});

minionsRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body);
    if (newMinion){
        res.status(201).send(newMinion);
    }
    else{
        res.status(500).send();
    }
});

minionsRouter.put('/:id', (req, res, next) => {
    const updatedMinion = updateInstanceInDatabase('minions', req.body);
    if (updatedMinion){
        res.status(201).send(updatedMinion);
    }
    else{
        res.status(500).send();
    }
});

minionsRouter.delete('/:id', (req, res, next) => {
    const deleteResult = deleteFromDatabasebyId('minions', req.params.id);
    if (deleteResult){
        res.status(204).send('OK');
    }
    else{
        res.status(500).send();
    }
});


// APIs for work

minionsRouter.get('/:id/work', (req, res, next) => {
    let minionWork = getAllFromDatabase('work');
    minionWork = minionWork.filter(work => {
        return work.minionId === req.minion.id ? work : null;
    });
    console.log(minionWork)
    res.status(200).send(minionWork);
});


module.exports = minionsRouter;