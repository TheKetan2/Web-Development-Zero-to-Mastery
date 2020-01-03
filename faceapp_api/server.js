const express = require("express");
const app = express();

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
  res.json("This is working Get");
});

app.post("/signin", (req, res) => {
  res.json(req.body);
});

app.listen(3000, () => {
  console.log("Server Started at port number 3000");
});

/* 
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
/
*/
