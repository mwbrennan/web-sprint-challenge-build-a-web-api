// Write your "actions" router here!
const express = require('express')

const Action = require('./actions-model');

const { checkId, checkAction, checkActionUpdates } = require('./actions-middleware')

const router = express.Router();



router.get('/:id', checkId, (req, res) => {
    const id = req.params.id;

    Action.get(id)
        .then(action => action ? res.status(200).json(action) : res.status(404).json({ message: 'Action not found' }))
})

router.get('/', (req, res) => {
    Action.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            res.status(404).json({ message: 'Action not found' })
        })
})

router.post('/', checkAction, async (req, res, next) => {
    try {
        const newAction = req.body;
        const data = await Action.insert(newAction);
        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
});

router.put('/:id', checkId, checkActionUpdates, (req, res, next) => {
    const id = req.params.id;
    const changes = req.body;

    !changes && res.status(400).json({ message: 'No updates in request body' })

    Action.update(id, changes)
        .then(updates => {
            res.status(200).json(updates);
        })
        .catch(err => {
            next();
        })
})

router.delete('/:id', checkId, async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await Action.remove(id);
        res.json(data);
    } catch (err) {
        next(err);
    }
})


module.exports = router;