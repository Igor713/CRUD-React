const express = require('express')
const todosRoutes = require('../routes/routes')

const app = express()

app.use(express.json())
app.use(todosRoutes)

app.get("/health", (req, res) => {
    return res.json("up")
})

app.listen(3000, () => {
    console.log("Server listening on port 3000")
})