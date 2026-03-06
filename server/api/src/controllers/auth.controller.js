const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const prisma = require("../config/db");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// @desc    Register a new user (Buyer only)
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "BUYER", // Default role for registration
      },
    });

    if (user) {
      res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user.id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Auth / register via Google OAuth (id_token verify)
// @route   POST /api/auth/google
// @access  Public
const googleAuth = async (req, res) => {
  // Accepte soit un id_token (flux OIDC), soit un access_token + profile (flux token Expo)
  const { idToken, profile } = req.body;

  if (!idToken) {
    return res.status(400).json({ message: "idToken (or access_token) is required" });
  }

  try {
    let googleId, email, name, picture;

    if (profile && profile.sub) {
      // Profil fourni directement par le client (accès via userinfo)
      ({ sub: googleId, email, name, picture } = profile);
    } else {
      // Vérification via tokeninfo Google (id_token classique)
      const response = await fetch(
        `https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`
      );
      const payload = await response.json();

      if (!response.ok || payload.error) {
        return res.status(401).json({ message: "Invalid Google token" });
      }
      ({ sub: googleId, email, name, picture } = payload);
    }

    if (!email) {
      return res.status(400).json({ message: "Email not provided by Google" });
    }

    // Chercher ou créer l'utilisateur
    let user = await prisma.user.findFirst({
      where: { OR: [{ googleId }, { email }] },
    });

    if (user) {
      // Mettre à jour googleId si connexion par email existant sans googleId
      if (!user.googleId) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: { googleId, picture: picture || user.picture },
        });
      }
    } else {
      // Nouvel utilisateur Google → BUYER par défaut
      user = await prisma.user.create({
        data: {
          email,
          name: name || email.split("@")[0],
          googleId,
          picture,
          role: "BUYER",
        },
      });
    }

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      picture: user.picture,
      token: generateToken(user.id),
    });
  } catch (error) {
    console.error("Google auth error:", error);
    res.status(500).json({ message: "Server error during Google authentication" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  googleAuth,
};
