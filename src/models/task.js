const mongoose = require('mongoose');
const validator = require('validator');

// Create task model

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

taskSchema.pre('save', async function(next) {
    const task = this
    
    // if(task.isModified('description')) {
    //     task.description = await task.description.toUpperCase()
    // }

    next()
})

const Task = new mongoose.model('Task', taskSchema)

module.exports = Task;