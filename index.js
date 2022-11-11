const express = require("express");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

//mongo db
const uri = `mongodb+srv://${process.env.TOUR_USER}:${process.env.TOUR_PASSWORD}@cluster0.guw4vbk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// crud operations
async function run() {
  try {
    const serviceCollection = client.db("tourUser").collection("tours");
    const reviewCollection = client.db("tourUser").collection("review");
    const addCollection = client.db("tourUser").collection("added");
    // jwt

    app.post('/jwt', (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
      res.send({ token })
    })

    // get api
    app.get("/services", async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });
    app.get("/services/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const service = await serviceCollection.findOne(query);
      res.send(service);
    });

    app.get("/review", async (req, res) => {
      console.log(req.query);
      let query = {};
      if (req.query.email) {
        query = {
          email: req.query.email,
        };
      }
      const cursor = reviewCollection.find(query);
      const review = await cursor.toArray();
      res.send(review);
    });

    app.get("/added", async (req, res) => {
      const query = {};
      const cursor = addCollection.find(query);
      const added = await cursor.toArray();
      res.send(added);
    });

    //review post api
    app.post("/review", async (req, res) => {
      const review = req.body;
      const result = await reviewCollection.insertOne(review);
      res.send(result);
    });

    //Add service post api
    app.post("/added", async (req, res) => {
      const add = req.body;
      const result = await addCollection.insertOne(add);
      res.send(result);
    });

    // delete review
    app.delete("/review/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await reviewCollection.deleteOne(query);
      res.send(result);
    });

    // update api 
    app.patch('/review/:id', async (req, res) => {
      const id = req.params.id;
      const status = req.body.status
      const query = { _id: ObjectId(id) };
      const updateDoc = {
        $set: {
          status: status
        }

      }
      const result = await reviewCollection.updateOne(query, updateDoc);
      res.send(result)
    })

  } finally {
  }
}
run().catch((err) => console.log(err));
app.get("/", (req, res) => {
  res.send("tour server running");
});

app.listen(port, (req, res) => {
  console.log(`server running ${port}`);
});










