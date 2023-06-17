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

app.get("/api/movies", movieHandler.getMovies);
app.get("/api/movies/:id", movieHandler.getMovieById);
app.put("/api/movies/:id", validateMovie, movieHandler.updateMovieById);
app.post("/api/movies", validateMovie, movieHandler.postMovie);
app.get("/api/users", userHandler.getUsers);
app.get("/api/users/:id", userHandler.getUserById);
app.put("/api/users/:id", validateUser, userHandler.updateUserById);
app.post("/api/users", validateUser, userHandler.postUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
