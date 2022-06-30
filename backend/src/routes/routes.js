const express = require('express')
const todosRoutes = express.Router()
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// Create
todosRoutes.post('/todos', async (req, res) => {

    const { name } = req.body
    const todo = await prisma.todo.create({
        data: {
            name,
        },
    })

    return res.status(201).json(allTodos)
})

// Read
todosRoutes.get('/todos', async (req, res) => {

    const todos = await prisma.todo.findMany()
    return res.status(200).json(todos)
})

// Update
todosRoutes.put('/todos', async (req, res) => {

    const { name, id, status } = req.body

    if (!id) {
        return res.status(400).json('Id is required')
    }

    const todoAlreadyExist = await prisma.todo.findUnique({ where: { id } })

    if (!todoAlreadyExist) {
        return res.status(404).json('Todo not exist')
    }

    const todo = await prisma.todo.update({
        where: {
            id,
        },
        data: {
            name,
            status,
        },
    })

    return res.status(200).json(todo)
})

// Delete
todosRoutes.delete('/todos/:id', async (res, req) => {

    const { id } = req.params

    const intId = parseInd(id)

    if (!intId) {
        return res.status(400).json('Id is required')
    }

    const todoAlreadyExist = await prisma.todo.findUnique({ where: { intId } })

    if (!todoAlreadyExist) {
        return res.status(404).json('Todo not exist')
    }

    prisma.todo.delete({ where: { intId } })

    return res.status(200).send()
})

module.exports = todosRoutes