const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "root",
    database: "smart_brain"
  }
});

// db.select("*")
//   .from("users")
//   .then(data => {
//     console.log(data);
//   });

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json(database.users[0]);
    console.log(database.users.length);
  } else {
    res.json("Wrong credentials");
  }
});

app.post("/register", (req, res) => {
  const { email, password, name } = req.body;
  let pass = "";

  db("users")
    .returning("*")
    .insert({ email: email, name: name, joined: new Date() })
    .then(user => res.json(user[0]))
    .catch(err => res.status(400).json("Unable to register"));
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  db.select("*")
    .from("users")
    .where({ id: id })
    .then(user => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json("Not found");
      }
    });
  // if (!found) res.status(404).json("no such user found");
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then(entries => {
      console.log(entries);
      res.json(entries);
    })
    .catch(err => res.status(400).json("Something went wrong..."));
});

bcrypt.hash("bacon", null, null, function(err, hash) {});

app.listen(3000, () => {
  console.log("Server Started at port number 3000");
});
