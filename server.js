// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

// Import controllers for different routes
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

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

// Create an instance of the Express application
const app = express();

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Define a route for the root path
app.get("/", (req, res) => {
  // Send a JSON response for the root path
  res.json(database.users); // Note: Update to use data from the database
});

// Define a route for user sign-in
app.post("/signin", (req, res) => {
  // Handle user sign-in using the signin controller
  signin.handleSignin(req, res, db, bcrypt);
});

// Define a route for user registration
app.post("/register", (req, res) => {
  // Handle user registration using the register controller
  register.handleRegister(req, res, db, bcrypt);
});

// Define a route for fetching user profiles by ID
app.get("/profile/:id", (req, res) => {
  // Handle profile retrieval using the profile controller
  profile.handleProfileGet(req, res, db);
});

// Define a route for updating user images
app.put("/image", (req, res) => {
  // Handle image updates using the image controller
  image.handleImage(req, res, db);
});

// Start the server and listen on port 3000
app.listen(3000, () => {
  // Log a message when the server starts
  console.log("Server listening on port 3000");
});
