const express = require('express')

const allTodos = [{ name: 'aaa', status: false }]
const todosRoutes = express.Router()

// Create
todosRoutes.post('/todos', (req, res) => {

    const { name } = req.body
    allTodos.push({ name, status: false })
    return res.status(201).json(allTodos)
})

// Read
todosRoutes.get('/todos', (req, res) => {

    return res.status(200).json(allTodos)
})

module.exports = todosRoutes