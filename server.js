// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");

// Create an instance of the Express application
const app = express();

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());
app.use(cors());

// In-memory database for demonstration purposes
const database = {
  users: [
    // Sample user data
    {
      id: 1,
      name: "John Doe",
      password: "password123",
      email: "john.doe@example.com",
      entries: 0,
      joined: new Date(),
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "jane.doe@example.com",
      password: "password123",
      entries: 0,
      joined: new Date(),
    },
    {
      id: 3,
      name: "Bob Smith",
      password: "password123",
      email: "bob.smith@example.com",
      entries: 0,
      joined: new Date(),
    },
  ],
};

// Define a route for the root path
app.get("/", (req, res) => {
  res.json(database.users);
});

// Define a route for user sign-in
app.post("/signin", (req, res) => {
  // Check if the provided email and password match the first user in the database

  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    // Respond with "success" if the credentials are valid
    res.json(database.users[0]);
  } else {
    // Respond with an error status and message if the credentials are invalid
    res.status(400).json("Error logging in");
  }
});

// Define a route for user registration
app.post("/register", (req, res) => {
  // Extract user information from the request body
  const { email, name, password } = req.body;

  // Add a new user to the database
  database.users.push({
    id: 125,
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });

  // Respond with the details of the newly registered user
  res.json(database.users[database.users.length - 1]);
});

// Define a route for fetching user profile by ID
app.get("/profile/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let found = false;

  // Iterate through the database users to find the user with the specified ID
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user); // Respond with the user details if found
    }
  });

  // If no user is found with the specified ID, respond with a 404 error
  if (!found) {
    return res.status(404).json("No such user");
  }
});

// Define a route for updating user image entry count
app.put("/image", (req, res) => {
  const id = parseInt(req.body.id);
  let found = false;

  // Iterate through the database users to find the user with the specified ID
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });

  // If no user is found with the specified ID, respond with a 404 error
  if (!found) {
    return res.status(404).json("No such user");
  }
});

// Start the server and listen on port 3000
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
