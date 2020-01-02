const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const Task = require('../models/task')

// Create new task
router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

// Display all tasks
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})

// Display task by id
router.get('/tasks/:id', async (req,res) => {
    const _id = req.params.id
    try {
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(404).send('No task found with that ID')
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

// Update task with specific id
router.patch('/tasks/:id', async (req,res) => {
    const _id = req.params.id
    const body = req.body
    const updates = Object.keys(body)
    const allowedUpdates = ['description', 'completed']
    const validCheck = updates.every(update => {
        return allowedUpdates.includes(update)
    })
    if (!validCheck) {
        return res.status(400).send('One or more of your update items is invalid')
    }
    try {        
        const task = await Task.findById(_id)
        updates.forEach(update => {
            task[update] = req.body[update]
        })
        await task.save()

        if(!task) {
            return res.status(404).send('No task found with that ID')
        }
        res.send(task)
    } catch (e) {
        res.status(400).send(e + "oops")
    }
})

// Delete task
router.delete('/tasks/:id', async (req,res) => {
    const _id = req.params.id
    try {
        const task = await Task.findByIdAndDelete(_id)
        if(!task) {
            return res.status(404).send('No task found with that ID')
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router