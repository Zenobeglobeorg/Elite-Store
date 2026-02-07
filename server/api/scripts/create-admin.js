/**
 * Script pour créer un utilisateur Admin (à lancer manuellement).
 * Usage depuis server/api :
 *   node scripts/create-admin.js
 *   node scripts/create-admin.js admin@example.com MonMotDePasseSecret
 *
 * Ou définir ADMIN_EMAIL et ADMIN_PASSWORD dans .env
 */
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const bcrypt = require("bcryptjs");
const prisma = require("../src/config/db");

async function createAdmin() {
  const email = process.argv[2] || process.env.ADMIN_EMAIL;
  const password = process.argv[3] || process.env.ADMIN_PASSWORD;
  const name = process.argv[4] || process.env.ADMIN_NAME || "Admin";

  if (!email || !password) {
    console.error(
      "Usage: node scripts/create-admin.js [email] [password] [name]\n" +
        "Or set ADMIN_EMAIL, ADMIN_PASSWORD (and optionally ADMIN_NAME) in .env"
    );
    process.exit(1);
  }

  if (password.length < 6) {
    console.error("Le mot de passe doit contenir au moins 6 caractères.");
    process.exit(1);
  }

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      if (existing.role === "ADMIN") {
        console.log("Un admin avec cet email existe déjà:", email);
        process.exit(0);
      }
      await prisma.user.update({
        where: { id: existing.id },
        data: { role: "ADMIN", name: name || existing.name },
      });
      console.log("Utilisateur existant promu Admin:", email);
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: "ADMIN",
      },
    });

    console.log("Admin créé avec succès:", email);
  } catch (err) {
    console.error("Erreur:", err.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
