const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");

const app = express();
app.use(bodyParser.json());

const database = {
  users: [
    {
      id: "123",
      name: "John",
      email: "john@gmail.com",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "Sally",
      email: "sally@gmail.com",
      entries: 0,
      joined: new Date(),
    },
  ],
  login: [
    {
      id: "987",
      has: "",
      email: "john@gmail.com",
    },
  ],
};

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  // Load hash from your password DB.
  bcrypt.compare(
    "apples",
    "$2a$10$vivQ93X090KmYSxpUbLpju2sLpvNlLxecT1uvYCV4WbSGgjX7BiRG",
    function (err, res) {
      console.log("first guess", res);
    }
  );

  bcrypt.compare(
    "veggies",
    "$2a$10$vivQ93X090KmYSxpUbLpju2sLpvNlLxecT1uvYCV4WbSGgjX7BiRG",
    function (err, res) {
      console.log("second guess", res);
    }
  );
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json("success");
  } else {
    res.status(404).json("error logging in");
  }
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;

  database.users.push({
    id: "125",
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });
  res.json(database.users[database.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(400).json("not found");
  }
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(400).json("not found");
  }
});

// bcrypt.hash(password, null, null, function (err, hash) {
//   console.log(hash);
// });

app.listen(3000, () => {
  console.log("App is running on port 3000");
});
