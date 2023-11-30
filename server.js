// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

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
app.use(cors());

// Define a route for the root path
app.get("/", (req, res) => {
  res.json(database.users);
});

// Define a route for user sign-in
app.post("/signin", (req, res) => {
  db.select("email", "hash")
    .where("email", "=", req.body.email)
    .from("login")
    .then((data) => {
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where("email", "=", req.body.email)
          .then((user) => {
            res.json(user);
          })
          .catch((err) => res.status(400).json("unable to get user"));
      } else {
        res.status(400).json("wrong credentials");
      }
    })
    .catch((err) => {
      res.status(400).json("wrong credentials");
    });
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;

  const hash = bcrypt.hashSync(password);
  db.transaction((trx) => {
    trx
      .insert({ hash: hash, email: email })
      .into("login")
      .returning("email")
      .then((loginEmail) => {
        return trx("users")
          .returning("*")
          .insert({
            name: name,
            email: loginEmail[0].email,
            joined: new Date(),
          })
          .then((user) => {
            res.json(user[0]);
          })
          .then(trx.commit)
          .catch(trx.rollback);
      });
  }).catch((err) => res.status(400).json("unable to register"));
});

app.get("/profile/:id", (req, res) => {
  const id = parseInt(req.params.id);

  db.select("*")
    .from("users")
    .where({ id })
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json("Not found");
      }
    });
});

app.put("/image", (req, res) => {
  const { id } = req.body;

  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0].entries);
    })
    .catch((err) => res.status(400).json("unable to get entries"));
});

// Start the server and listen on port 3000
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
