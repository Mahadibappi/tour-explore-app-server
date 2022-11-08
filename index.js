const express = require('express');
const cors = require('cors');
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000;

//middleware
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("tour server running")
})

app.listen(port, (req, res) => {
    console.log(`server running ${port}`)
})

// pass: qYTNkxT5XpUy8rx5
// user = genius-user