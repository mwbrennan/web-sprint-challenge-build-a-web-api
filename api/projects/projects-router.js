// Write your "projects" router here!
const express = require('express');
const Project = require('./projects-model');

const { checkId, checkProject, checkProjectUpdates, checkIdProjectActions } = require('./projects-middleware');

const router = express.Router()

router.get('/', (req, res) => {
    Project.get()
        .then(projects => {
            res.status(200).json(projects)
        })
})

router.get('/:id', checkId, (req, res) => {
    res.status(200).json(req.project)
})

router.post('/', checkProject, async (req, res, next) => {
    try{
        const data = await Project.insert(req.body);
        res.status(200).json(data);
    }catch(err) {
        next(err);
    }
})

router.put('/:id', checkId, checkProjectUpdates, (req, res, next) => {
    const id = req.params.id;
    const changes = req.body;

    !changes && res.status(400).json({ message: 'No updates in request body' })

    Project.update(id, changes)
        .then(updates => {
            res.status(200).json(updates);
        })
        .catch(err => {
            next(err);
        })
})

router.delete('/:id', checkId, async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await Project.remove(id);
        res.json(data)
    } catch (err) {
        next(err);
    }
})

router.get('/:id/actions', checkIdProjectActions, (req, res) => {
    const id = req.params.id;

    Project.getProjectActions(id)
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(err => {
            res.status(500).json({ message: 'Server error' })
        })
})

module.exports = router;