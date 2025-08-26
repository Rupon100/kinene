const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
require("dotenv").config();

const port = process.env.PORT || 4080;


const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nnefkr8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
 
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // (optional starting in v4.7)
    await client.connect();

    // db and collection
    const users = client.db('Kinene').collection('users');

    

    app.get("/", (req, res) => {
      res.send({ Message: "everything ok!" });
    });

     
   
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
