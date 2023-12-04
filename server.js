import express from "express";
import bcrypt from "bcrypt-nodejs";
import cors from "cors";
import knex from "knex";
import register from "./controllers/register.js";
import signin from "./controllers/signin.js";
import profile from "./controllers/profile.js";
import image from "./controllers/image.js";
import bodyParser from "body-parser";

// Create an instance of the Express application
const app = express();

// Middleware setup
app.use(bodyParser.json()); // Use body-parser middleware to parse JSON requests
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)

// Create a connection to the PostgreSQL database
const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: "postgres",
    password: "root",
    database: "smart-brain",
  },
});

// Route definitions
app.get("/", (req, res) => res.json(database.users)); // Define a route for the root path
app.post("/signin", (req, res) => signin.handleSignin(req, res, db, bcrypt)); // Define a route for user sign-in
app.post("/register", (req, res) =>
  register.handleRegister(req, res, db, bcrypt)
); // Define a route for user registration
app.get("/profile/:id", (req, res) => profile.handleProfileGet(req, res, db)); // Define a route for fetching user profiles by ID
app.put("/image", (req, res) => image.handleImage(req, res, db)); // Define a route for updating user images
app.post("/imageUrl", (req, res) => image.handleApiCall(req, res, db)); // Define a route for updating user images

// Start the server and listen on port 3000
app.listen(process.env.PORT || 3000, () =>
  console.log("Server listening on port 3000")
); // Log a message when the server starts
