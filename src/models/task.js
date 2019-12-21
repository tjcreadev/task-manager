const mongoose = require('mongoose');
const validator = require('validator');

// Create task model
const Task = new mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = Task;