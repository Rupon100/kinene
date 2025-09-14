const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cloudinary = require("./cloudinary");
const multer = require("multer");
const streamifier = require("streamifier");

// import nodemailer email send
const { sendWelcomeEmail, WantSellerEmail } = require("./emailService");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "DELETE", "UPDATE", "PATCH", "GET", "PUT"],
    credentials: true,
  })
);
require("dotenv").config();

const port = process.env.PORT || 4080;

//-------------------------multer + cloudinary setup---------------------
const storage = multer.memoryStorage();
const upload = multer({ storage });

//------------------------------mongodb-------------------------
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
  if (!token) return res.status(401).send({ message: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Invalid token!" });
    }
    req.user = decoded; // decoded from here
    next();
  });
};

// verify customer
const verifyCustomer = (req, res, next) => {
  if (!req.user) return res.status(401).send({ message: "Unauthorized" });
  if (req.user.type !== "customer" && req.user.type !== "admin") {
    return res.status(403).send({ message: "Forbidden Access" });
  }
  next();
};

// verify seller
const verifySeller = (req, res, next) => {
  console.log(req.user);
  if (!req.user) return res.status(401).send({ message: "Unauthorized" });
  if (req.user.type !== "seller" && req.user.type !== "admin") {
    return res.status(403).send({ message: "Forbidden Access" });
  }
  next();
};

// verify Admin
const verifyAdmin = (req, res, next) => {
  if (!req.user) return res.status(401).send({ message: "Unauthorized" });
  if (req.user.type !== "admin")
    return res.status(403).send({ message: "Forbidden Access" });
};

async function run() {
  try {
    // (optional starting in v4.7)
    await client.connect();

    // db and collection
    const usersCollection = client.db("Kinene").collection("users");
    const sellersCollection = client.db("Kinene").collection("sellers");
    const productsCollection = client.db("Kinene").collection("products");

    //--------------------------------user auth------------------------------
    // make token for user auth
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      console.log("Token create for: ", user);

      const foundUserForType = await usersCollection.findOne(user);
      console.log(
        "Find the user from collection fot fet the type: ",
        foundUserForType
      );

      const type = foundUserForType?.type || "customer";

      const token = jwt.sign({ user, type }, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: false, // production will be true
      });
      res.send(token);
    });

    // social login save data
    app.post("/auth-google", async (req, res) => {
      const { email, uid, name } = req.body;

      let user = await usersCollection.findOne({ email });
      if (!user) {
        user = { email, uid, name, type: "customer", authProvider: "Google" };
        await usersCollection.insertOne(user);

        try {
          const result = await sendWelcomeEmail(email);
          console.log("WelCome Email result: ", result);
        } catch (err) {
          console.log("Server email error: ", err.message);
        }
      }

      res.status(200).send({ message: "Google Auth Successful!" });
    });

    // user logOut clear cookie
    app.post("/logout", async (req, res) => {
      res.clearCookie("token", {
        httpOnly: true,
        secure: false,
      });
      res.status(200).send({ message: "Logout successful!" });
    });

    // user register
    app.post("/register", async (req, res) => {
      const { email, pass, uid, type } = req.body;

      try {
        // hashed pass
        const saltRounds = 10;
        const hashedPass = await bcrypt.hash(pass, saltRounds);

        // create user data with hashed pass
        const user = { email, pass: hashedPass, uid, type };

        // insert data into db
        const result = await usersCollection.insertOne(user);

        sendWelcomeEmail(email).catch((err) => {
          console.log("Welcome regi.. error: ", err.message);
        });

        res.send(result);
      } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: "Registration stored data failed!" });
      }
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

    // get user for role
    app.get("/users/:email", async (req, res) => {
      const result = await usersCollection.findOne({ email: req.params.email });
      res.send(result);
    });

    //-------------------------------profile information edit--------------------
    // get a user information
    app.get("/db-user/:email", verifyToken, async (req, res) => {
      const result = await usersCollection.findOne({ email: req.params.email });
      res.send(result);
    });

    // user address
    app.put(
      "/user/address/:email",
      verifyToken,
      verifyCustomer,
      async (req, res) => {
        const email = { email: req.params.email };
        const { address } = req.body;
        const updateDoc = {
          $set: { address },
        };
        const result = await usersCollection.updateOne(email, updateDoc);
        res.send(result);
      }
    );

    // helper function must return a promise
    const uploadFormBuffer = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "profiles", overwrite: true }, // ✅ overwrite fixed spelling
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
        streamifier.createReadStream(buffer).pipe(stream);
      });
    };

    // upload image in cloudinary + save in
    app.post(
      "/profile-image/:email",
      verifyToken,
      verifyCustomer,
      upload.single("image"),
      async (req, res) => {
        const email = req.params.email;
        console.log(`Uploaded email: ${email} || image data: `, req.file);

        try {
          const result = await uploadFormBuffer(req.file.buffer);

          // save the URL in DB for later usage
          await usersCollection.updateOne(
            { email },
            {
              $set: {
                profileImage: result.secure_url,
                profileImageId: result?.public_is,
              },
            }
          );

          res.send(result);
        } catch (err) {
          console.log("Upload error: ", err.message);
          res.status(500).send({ message: "Image upload failed!" });
        }
      }
    );
    // patch for the profile

    // get the profile image
    app.get("/users/:email", verifyToken, verifyCustomer, async (req, res) => {
      const email = req.params.email;
      const user = await usersCollection.findOne({ email });
      res.send(user);
    });

    // change profile username
    app.patch(
      "/profile/username/:email",
      verifyToken,
      verifyCustomer,
      async (req, res) => {
        const { username } = req.body;
        const email = req.params.email;

        const updateDoc = {
          $set: {
            name: username,
          },
        };

        const result = await usersCollection.updateOne(
          { email: email },
          updateDoc
        );
      }
    );

    // send email (nodemailer make it at first) and add into a store who become a seller
    app.post(
      "/customer-to-seller/:email",
      verifyToken,
      verifyCustomer,
      async (req, res) => {
        try {
          console.log(req.params.email);
          const email = req.params.email;

          const existApplication = await sellersCollection.findOne({
            email: req.params.email,
          });
          if (existApplication) {
            return res.status(409).send({ message: "Already applied!" });
          }

          const data = req.body;
          data.seller = false;
          const result = await sellersCollection.insertOne(data);

          try {
            await WantSellerEmail(
              process.env.EMAIL_USER,
              email,
              data?.store_name,
              data.mobile_number,
              data?.location,
              data?.letter
            );
          } catch (emailErr) {
            console.log(emailErr.message);
          }

          res.send(result);
        } catch (err) {
          console.log({ message: "cant send message something wrong!" });
        }
      }
    );

    // ---------------------------- seller dashboard ------------------------------
    // add a product to db
    app.post(
      "/add-products",
      verifyToken,
      verifySeller,
      upload.array("images", 3), // max 3 images
      async (req, res) => {
        try {
          const { email, name, stock, price, category, details } = req.body;
          const files = req.files; // multer parses files
          const urlImg = [];

          // loop over files and upload each one
          for (const file of files) {
            const result = await uploadFormBuffer(file.buffer);
            urlImg.push(result.secure_url); // store Cloudinary URL
          }

          // make new product object
          const newProduct = {
            email,
            name,
            stock: Number(stock),
            price: Number(price),
            category,
            details,
            images: urlImg, // array of Cloudinary URLs
            createdAt: new Date(),
          };

          console.log(newProduct)

          // insert into db
          const insertResult = await productsCollection.insertOne(newProduct);

          res.send(insertResult);
        } catch (err) {
          console.error("Error adding product:", err.message);
          res
            .status(500)
            .send({ success: false, message: "Failed to add product!" });
        }
      }
    );

    //-------------------------------blog related apis---------------------

    // blog api --- verifyToken + user type
    app.get("/blog/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      const decodedUser = req.user;

      console.log("Decoded User: ", decodedUser); // email: decodedUser?.user?.email  && type: decodedUser?.type
      console.log("user email: ", email);

      if (
        decodedUser?.user?.email !== email &&
        decodedUser?.type !== "customer"
      ) {
        res.send("err from blog check!");
        return res.status(403).send({ message: "Forbidden Access" });
      }

      res
        .status(200)
        .send({ message: "this is blog, check if it working well or not!" });
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
