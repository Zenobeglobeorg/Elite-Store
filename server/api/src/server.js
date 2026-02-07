const path = require("path");
const dotenv = require("dotenv");

// Charger .env depuis la racine du projet (server/api/)
const envPath = path.resolve(__dirname, "..", ".env");
const result = dotenv.config({ path: envPath });

if (result.error && process.env.NODE_ENV !== "production") {
  console.warn("Attention: fichier .env non trouvé ou vide. Copiez .env.example vers .env et remplissez DATABASE_URL et JWT_SECRET.");
}

if (!process.env.DATABASE_URL) {
  console.error("Erreur: DATABASE_URL est manquant. Définissez-le dans .env (voir .env.example).");
  process.exit(1);
}
if (!process.env.JWT_SECRET) {
  console.error("Erreur: JWT_SECRET est manquant. Définissez-le dans .env (voir .env.example).");
  process.exit(1);
}

const app = require("./app");
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`Erreur: le port ${PORT} est déjà utilisé. Fermez l'autre processus ou changez PORT dans .env`);
  } else {
    console.error("Erreur serveur:", err.message);
  }
  process.exit(1);
});
