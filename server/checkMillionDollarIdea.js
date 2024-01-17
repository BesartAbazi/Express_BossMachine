const checkMillionDollarIdea = (req, res, next) => {
    const newIdea = req.body;
    if (!newIdea.numWeeks || !newIdea.weeklyRevenue || typeof(newIdea.numWeeks) !== 'number' || typeof(newIdea.weeklyRevenue) !== 'number'){
        return res.status(400).send();
    }

    if (newIdea.numWeeks * newIdea.weeklyRevenue < 1000000) {
        return res.status(400).send('The idea is not worth!');
    }
    
    next();
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
