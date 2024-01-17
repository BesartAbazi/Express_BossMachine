const express = require('express');
const meetingsRouter = express.Router();
const {
    createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase,
} = require('./db');

meetingsRouter.param('id', (req, res, next, id) => {
    const meeting = getFromDatabaseById('meetings', id);
    if (meeting){
        req.meeting = meeting;
        next();
    }
    else{
        res.status(404).send('Error: Unknown meeting id.');
    }
});

meetingsRouter.get('/', (req, res, next) => {
    const allMeetings = getAllFromDatabase('meetings');
    if (allMeetings)
        res.status(200).send(allMeetings)
    else
        res.status(404).send('Error: System error.')
});

meetingsRouter.get('/:id', (req, res, next) => {
    res.status(200).send(req.meeting);
});

meetingsRouter.post('/', (req, res, next) => {
    const newMeeting = createMeeting('meetings', req.body);
    if (newMeeting){
        res.status(201).send(newMeeting);
    }
    else{
        res.status(500).send();
    }
});

meetingsRouter.put('/:id', (req, res, next) => {
    const updatedMeeting = updateInstanceInDatabase('meetings', req.body);
    if (updatedMeeting){
        res.status(201).send(updatedMeeting);
    }
    else{
        res.status(500).send();
    }
});

meetingsRouter.delete('/', (req, res, next) => {
    const emptyMeetingsArray = deleteAllFromDatabase('meetings');
    if (emptyMeetingsArray.length === 0){
        res.status(204).send('OK');
    }
    else{
        res.status(500).send();
    }
});


module.exports = meetingsRouter;