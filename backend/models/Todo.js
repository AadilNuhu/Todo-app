const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    task: String,
    done: {
        type: Boolean,
        default: true
    }
})

const todoModel  = mongoose.model("todos", todoSchema)

module.exports = todoModel