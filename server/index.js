const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:5173'],
  methods: ['POST', 'DELETE', 'UPDATE', 'PATCH', 'GET'],
  credentials: true
}));
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


// verify token here
const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;
  if(!token) return res.status(401).send({message: "Unauthorized"})

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if(err){
      return res.status(401).send({message: "Invalid token!"});
    }
    req.user = decoded; // decoded from here
    next();
  })  
}

// not decoded everywhere because token verify already decoded the user

// verify customer
const verifyUser = (req, res, next) => {
  if(!req.user) return res.status(401).send({message: "Unauthorized"});
  if(req.user.role !== 'customer' && req.user.role !== "admin") return res.status(403).send({message: "Forbidden Access"});
}

// verify seller
const verifyCustomer = (req, res, next) => {
  if(!req.user) return res.status(401).send({message: "Unauthorized"});
  if(req.user.role !== 'seller' && req.user.role !== "admin") return res.status(403).send({message: "Forbidden Access"});
} 

// verify Admin
const verifyAdmin = (req, res, next) => {
  if(!req.user) return res.status(401).send({message: "Unauthorized"});
  if(req.user.role !== 'admin') return res.status(403).send({message: "Forbidden Access"})
}

async function run() {
  try {
    // (optional starting in v4.7)
    await client.connect();

    // db and collection
    const usersCollection = client.db("Kinene").collection("users");

    //--------------------------------user auth------------------------------
    // make token for user auth
    app.post('/jwt', async(req, res) => {
      const user = req.body;
      console.log("Token create for: ", user);

      const foundUserForType = await usersCollection.findOne(user);
      console.log("Find the user from collection fot fet the type: ", foundUserForType);

      const type = foundUserForType?.type || 'customer';

      const token = jwt.sign({user, type}, process.env.JWT_SECRET, { expiresIn: '2h' })
      res.cookie('token', token, {
        httpOnly: true,
        secure: false, // production will be true
      })
      res.send(token);
    })

    // user logOut clear cookie
    app.post('/logout', async(req, res) => {
      res.clearCookie('token', {
        httpOnly: true,
        secure: false,
      })
      res.status(200).send({message: "Logout successful!"})
    })

    // user register
    app.post("/register", async (req, res) => {
      const { email, pass, uid, type } = req.body;

      const saltRounds = 10;
      const hashedPass = await bcrypt.hash(pass, saltRounds);

      console.log(hashedPass);
      const user = { email, pass: hashedPass, uid, type };
 
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


    //-------------------------------blog related apis---------------------

    // blog api --- verifyToken + user type
    app.get('/blog/:email', verifyToken, async(req, res) => {
      const email = req.params.email;
      const decodedUser = req.user;

      console.log("Decoded User: ", decodedUser); // email: decodedUser?.user?.email  && type: decodedUser?.type
      console.log('user email: ', email);

      if(decodedUser?.user?.email !== email && decodedUser?.type !== "customer"){
        res.send("err from blog check!")
        return res.status(403).send({message: "Forbidden Access"});
      }

      res.status(200).send({message: "this is blog, check if it working well or not!"});
    })




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
