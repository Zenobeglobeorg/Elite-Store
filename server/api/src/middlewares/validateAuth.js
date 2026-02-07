/**
 * Validation simple pour register et login (sans dépendance externe).
 * Retourne 400 avec message si invalide.
 */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;
  const errors = [];

  if (!email || typeof email !== "string" || !email.trim()) {
    errors.push("Email is required");
  } else if (!emailRegex.test(email.trim())) {
    errors.push("Invalid email format");
  }
  if (!password || typeof password !== "string") {
    errors.push("Password is required");
  } else if (password.length < 6) {
    errors.push("Password must be at least 6 characters");
  }
  if (!name || typeof name !== "string" || !name.trim()) {
    errors.push("Name is required");
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: errors.join("; ") });
  }
  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email || typeof email !== "string" || !email.trim()) {
    errors.push("Email is required");
  } else if (!emailRegex.test(email.trim())) {
    errors.push("Invalid email format");
  }
  if (!password || typeof password !== "string") {
    errors.push("Password is required");
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: errors.join("; ") });
  }
  next();
};

module.exports = { validateRegister, validateLogin };
