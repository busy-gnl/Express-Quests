require("dotenv").config();
const { APP_PORT} = process.env;

const express = require("express");
const app = express();
app.use(express.json()); 

const port = APP_PORT ?? 5000;

// Routes handlers

const movieHandler = require("./movieHandler");
const userHandler = require("./userHandler");
const { validateUser, validateMovie } = require("./validators");
const { hashPassword, verifyPassword } = require("./auth.js");
// in app.js

const isItMarty = (req, res) => {
  if (req.body.email === "marty@wilder.com" && req.body.password === "Wild4ever") {
    res.send("Credentials are valid");
  } else {
    res.sendStatus(401);
  }
};

app.post("/api/login", userHandlers.getUserByEmailWithPasswordAndPassToNext, verifyPassword);

app.get("/api/movies", movieHandler.getMovies);
app.get("/api/movies/:id", movieHandler.getMovieById);
app.put("/api/movies/:id", validateMovie, movieHandler.updateMovieById);
app.post("/api/movies", validateMovie, movieHandler.postMovie);
app.delete("/api/movies/:id", movieHandler.deleteMovie);
app.get("/api/users", userHandler.getUsers);
app.put("/api/users/:id", validateUser, hashPassword, userHandler.updateUserById);
app.post("/api/users", validateUser, hashPassword, userHandler.postUser);
app.delete("/api/users/:id", userHandler.deleteUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
