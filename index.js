const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000;

//middleware
app.use(cors())
app.use(express.json())


//mongo db
const uri = `mongodb+srv://${process.env.TOUR_USER}:${process.env.TOUR_PASSWORD}@cluster0.guw4vbk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.get("/", (req, res) => {
    res.send("tour server running")
})

app.listen(port, (req, res) => {
    console.log(`server running ${port}`)
})

// pass: qYTNkxT5XpUy8rx5
// user = genius-user

