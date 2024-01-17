const express = require('express');
const ideasRouter = express.Router();
const {
    createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase,
} = require('./db');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

ideasRouter.param('id', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);
    if (idea){
        req.idea = idea;
        next();
    }
    else{
        res.status(404).send('Error: Unknown idea id.');
    }
});

ideasRouter.get('/', (req, res, next) => {
    const allIdeas = getAllFromDatabase('ideas');
    if (allIdeas)
        res.status(200).send(allIdeas)
    else
        res.status(404).send('Error: System error.')
});

ideasRouter.get('/:id', (req, res, next) => {
    res.status(200).send(req.idea);
});

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const newIdea = addToDatabase('ideas', req.body);
    if (newIdea){
        res.status(201).send(newIdea);
    }
    else{
        res.status(500).send();
    }
});

ideasRouter.put('/:id', checkMillionDollarIdea, (req, res, next) => {
    const updatedIdea = updateInstanceInDatabase('ideas', req.body);
    if (updatedIdea){
        res.status(201).send(updatedIdea);
    }
    else{
        res.status(500).send();
    }
});

ideasRouter.delete('/:id', (req, res, next) => {
    const deleteResult = deleteFromDatabasebyId('ideas', req.params.id);
    if (deleteResult){
        res.status(204).send('OK');
    }
    else{
        res.status(500).send();
    }
});


module.exports = ideasRouter;