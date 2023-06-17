const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.string().max(255).required(),
});

const validateUser = (req, res, next) => {
  const { name } = req.body;

  const { error } = userSchema.validate(
    { name },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

const movieSchema = Joi.object({
  title: Joi.string().max(255).required(),
  director: Joi.string().max(255).required(),
  year: Joi.number().integer().min(1900).max(2023),
  duration: Joi.number().integer().min(1).max(300)
});

const validateMovie = (req, res, next) => {
  const { title, director, year, duration } = req.body;

  const { error } = movieSchema.validate(
    { title, director, year, duration },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

module.exports = { validateUser, validateMovie };