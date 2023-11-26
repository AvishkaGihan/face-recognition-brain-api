// Import required modules
const express = require("express");
const bodyParser = require("body-parser");

// Create an instance of the Express application
const app = express();

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());

// In-memory database for demonstration purposes
const database = {
  users: [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
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
      email: "bob.smith@example.com",
      password: "password123",
      entries: 0,
      joined: new Date(),
    },
  ],
};

// Define a route for the root path
app.get("/", (req, res) => {
  // Respond with "Hello World!" for the root path
  res.send("Hello World!");
});

// Define a route for user sign-in
app.post("/signin", (req, res) => {
  // Check if the provided email and password match the first user in the database
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    // Respond with "success" if the credentials are valid
    res.json("success");
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
    id: "125",
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });

  // Respond with the details of the newly registered user
  res.json(database.users[database.users.length - 1]);
});

// Start the server and listen on port 3000
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

/*
/ --> res = this is working
/signing --> POST success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/
