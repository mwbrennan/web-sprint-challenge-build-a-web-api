const Action = require('./actions-model');

const checkId = async (req, res, next) => {
    try {
        const action = await Action.get(req.param.id);
        if (!action){
            res.status(400).json({ message: 'Action not found' })
        } else {
            req.action = action;
            next();
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
};

const checkAction = (req, res, next) => {
    const newAction = req.body;
    try {
        if(!newAction.project_id || !newAction.description || !newAction.notes) {
            res.status(400).json({ message: 'Project ID, Description, and Notes required' })
        } else {
            next();
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
};

const checkActionUpdates = (req, res, next) => {
    const changes = req.body;

    if(!changes.id && !changes.project_id && !changes.description && !changes.notes && !changes.completed){
        res.status(400).json({ message: 'All fields required' });
        next();
    } else {
        next()
    }
};

module.exports = {
    checkId,
    checkAction,
    checkActionUpdates
}