const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const PORT = 3000
const todoModel = require('./models/Todo')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/test')

// POST: create task
app.post('/task', (req,res) => {
    const task = req.body.task
    todoModel.create({task: task })
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

// GET: All tasks
app.get('/get',(req,res)=>{
    todoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

// PUT: toggle done status
app.put('/update/:id', (req,res) => {
    const {id} = req.params;
    todoModel.findById(id)
    .then(todo => {
        if (!todo) return res.status(404).res.json({error : 'Todo not found'})
        todoModel.findByIdAndUpdate(id, {done:!todo.done},{new:true})
        .then(updated => res.json(updated))
        .catch(err => res.json(err))
    })
})

// DELETE: Task by ID
app.delete('/delete/:id', (req,res) => {
    const {id} = req.params;
    todoModel.findByIdAndDelete({_id:id})
    .then(result => res.json(result))
    .catch(err => res.json(err)) 
})

app.listen(PORT, ()=>{
    console.log(`Server running on port : ${PORT}`);
    
})