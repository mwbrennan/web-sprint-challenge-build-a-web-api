const Project = require('./projects-model');

const checkId = async (req, res, next) => {
    try {
        const project = await Project.get(req.params.id);
        if(!project) {
            res.status(404).json({ message: 'Project not found' })
        } else {
            req.project = project;
            next();
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
};

const checkIdProjectActions = async (req, res, next) => {
    try {
        const project = await Project.get(req.params.id);
        if(!project) {
            res.status(404).json([])
        } else {
            req.project = project;
            next();
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
}

const checkProject = (req, res, next) => {
    try {
        if(!req.body.name || !req.body.description) {
            req.status(400).json({ message: 'Name and Description required' })
        } else {
            next();
        }
    } catch (err) {
        res.status(400).json({ message: 'Server error' })
    }
}

const checkProjectUpdates = (req, res, next) => {
    const changes = req.body;

    if (!changes.name && !changes.description && !changes.completed) {
        res.status(400).json({ message: 'All fields required' });
        next();
    } else {
        next();
    }
}

module.exports = {
    checkId,
    checkProject,
    checkProjectUpdates,
    checkIdProjectActions
}