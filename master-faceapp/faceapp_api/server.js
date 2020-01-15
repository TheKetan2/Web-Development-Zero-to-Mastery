const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const database = {
  users: [
    {
      id: "1234",
      name: "john",
      email: "john@gmail.com",
      password: "john",
      entries: 0,
      joined: new Date()
    },
    {
      id: "123",
      name: "sally",
      email: "sally@gmail.com",
      password: "sally",
      entries: 0,
      joined: new Date()
    }
  ],
  login: [
    {
      id: "987",
      hash: "",
      email: "john@gmail.com"
    }
  ]
};

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

  bcrypt.hash(password, null, null, function(err, hash) {
    console.log(hash);
    pass = hash;
  });

  // console.log(pass);

  database.users.push({
    name: name,
    email: email,
    password: pass,
    joined: new Date(),
    id: Math.round(Math.random() * 9999).toString(),
    entries: 0
  });
  res.json(database.users[database.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) res.status(404).json("no such user found");
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) res.status(404).json("no such user found");
});

bcrypt.hash("bacon", null, null, function(err, hash) {});

app.listen(3000, () => {
  console.log("Server Started at port number 3000");
});
