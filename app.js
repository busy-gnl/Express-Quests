require("dotenv").config();
const { APP_PORT} = process.env;

const express = require("express");
const app = express();

const port = APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favorite movie list");
};
const users = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
];

// Routes handlers

app.get("/", welcome);
app.get("/api/users", (req, res) => {
  res.status(200).json(users);
});
app.get("/api/users/:id", (req, res) => {
  const { id } = req.params;

  const user = users.find((user) => user.id === id);
  if (!user){
    return res.status(404).send("User not found" );
  }
  res.status(200).json(user);
});


const movieHandlers = require("./movieHandlers");
const userHandler = require("./userHandler");
const database = require("./database");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/users", userHandler.getUsers);
app.get("/api/users/:id", userHandler.getUserById);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
