const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");

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
    const usersCollection = client.db("Kinene").collection("users");

    //--------------------------------user auth------------------------------
    // user register
    app.post("/register", async (req, res) => {
      const { email, pass, uid } = req.body;

      const saltRounds = 10;
      const hashedPass = await bcrypt.hash(pass, saltRounds);

      console.log(hashedPass);
      const user = { email, pass: hashedPass, uid };

      // // check if already has in the db
      // const isExist = await usersCollection.findOne({email});
      // console.log("User exist or not", isExist)

      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    //user login
    app.post("/login", async (req, res) => {
      const { email, pass } = req.body;
      try {
        const user = await usersCollection.findOne({ email: email });
        console.log(user);
        if (!user) {
          return res.status(404).send({ message: "User Not Found!" });
        }

        const isMatch = await bcrypt.compare(pass, user?.pass);
        console.log(isMatch);

        if (!isMatch) {
          res.status(401).send({ message: "Incorrect Password!" });
        }

        res.status(200).send({
          message: "Login Successful",
          user: {
            email: user?.email,
          },
        });
      } catch (err) {
        res.status(400).send("Server error!");
      }
    });

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
