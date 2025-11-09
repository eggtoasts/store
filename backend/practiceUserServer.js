import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import productRoutes from "./routes/productRoutes.js";
import { sql } from "./config/db.js";
import { aj } from "./lib/arcjet.js";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";
import jwt from "jsonwebtoken";

const LocalStorage = Strategy;

dotenv.config();

const app = express();
const PORT = 3003;
console.log(PORT);

app.use(express.json());
app.use(cors());

app.post("/api/login", (req, res) => {
  //create mock user

  const user = {
    id: 1,
    username: "brad",
    email: "brad@gmail.com",
  };

  //payload and secret key
  jwt.sign({ user: user }, "secretkey", { expiresIn: "30s" }, (err, token) => {
    res.json({
      token: token,
    });
  });
});

// I wanna protect this route :p
// ** we add a middleware to protect our route.
app.post("/api/users", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, data) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "User created....",
        data: data,
      });
    }
  });
});

// Format of TOKEN
// Authorization: Bearer    <token>         <-- we need to pull the token out

// middleware
// verifies token           //next goes to the next async callback for req n res
function verifyToken(req, res, next) {
  //get auth header value
  const bearerHeader = req.headers["authorization"];

  //check if bearer undefined

  if (typeof bearerHeader !== "undefined") {
    // Split at space
    // bearer  token

    const bearer = bearerHeader.split(" ");

    //get token from array
    const bearerToken = bearer[1];

    //set the token
    req.token = bearerToken;

    //call next middleware

    next();
  } else {
    //forbidden
    res.status(403).json({ message: "Forbidden" });
  }
}

app.get("/api", (req, res) => {
  res.json({
    message: "hi",
  });
});
const signUpRouter = express.Router();

signUpRouter.post("/sign-up", async (req, res) => {
  console.log("bruh");
  try {
    await sql`
      INSERT INTO users (username, password)
      VALUES (${req.body.username}, ${req.body.password});
    `;
    res.status(201).send("User created successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating user");
  }
});

app.use("/", signUpRouter);

// NOT THE SAFE WAY TO CREATING USERS !!
async function userDB() {
  try {
    await sql`
       CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, username VARCHAR(255), password VARCHAR(255));
        `;

    console.log("Database has been init sucessfully");
  } catch (err) {
    console.log("Error initializing user DB", err);
  }
}

userDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
  });
});
