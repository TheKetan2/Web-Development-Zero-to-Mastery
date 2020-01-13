const express = require("express");
const bodyParser = require("body-parser");

const app = express();
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
  ]
};

app.get("/", (req, res) => {
  res.send("This is working Get");
});

app.post("/signin", (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json("Success");
  } else {
    res.json("Wrong credentials");
  }
});

app.post("/register", (req, res) => {
  database.users.push({ ...req.body, joined: new Date() });
  res.json(database.users);
});

app.listen(3000, () => {
  console.log("Server Started at port number 3000");
});
