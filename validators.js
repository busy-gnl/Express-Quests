const Joi = require("joi");

const userSchema = Joi.object({
  firstname: Joi.string().max(255).required(),
  lastname: Joi.string().max(255).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } } ),
  city: Joi.string().max(255).required(),
  language: Joi.string().max(255).required(),
  password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/),
});

const validateUser = (req, res, next) => {
  const { firstname, lastname, email, city, language, password } = req.body;

  const { error } = userSchema.validate(
    { firstname, lastname, email, city, language, password },
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