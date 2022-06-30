const express = require('express')
const todosRoutes = require('../routes/routes')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())
app.use(todosRoutes)

app.get("/health", (req, res) => {
    return res.json("up")
})

app.listen(3030, () => {
    console.log("Server listening on port 3030")
})