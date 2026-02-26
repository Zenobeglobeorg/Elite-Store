# Déploiement Elite Store

Ce guide décrit comment déployer le **frontend** (Expo web) sur **Vercel** et le **backend** (Node.js) sur **Railway**.

---

## 1. Backend sur Railway

### Prérequis

- Compte [Railway](https://railway.app)
- Base PostgreSQL (Railway propose une base, ou utilise Supabase)

### Étapes

1. **Créer un projet Railway**  
   Sur [railway.app](https://railway.app) → New Project.

2. **Ajouter une base PostgreSQL** (si tu n’en as pas)  
   Dans le projet → Add → Database → PostgreSQL.  
   Railway crée la base et expose `DATABASE_URL` dans Variables.

3. **Déployer le backend**  
   - Add → GitHub Repo → sélectionne ton repo.  
   - Dans les paramètres du **service** créé :
     - **Root Directory** : `server/api`
     - **Build Command** : laissé vide (Railway utilise `npm run build` du `package.json`)
     - **Start Command** : laissé vide (Railway utilise `npm start`)

4. **Variables d’environnement** (onglet Variables du service)  
   - `DATABASE_URL` : chaîne de connexion PostgreSQL (voir **Supabase** ci‑dessous si tu utilises Supabase).  
   - `JWT_SECRET` : une longue chaîne aléatoire (ex. `openssl rand -base64 32`).  
   - `FRONTEND_URL` : l’URL du frontend Vercel (ex. `https://elite-store.vercel.app`) pour CORS.

   **Utiliser Supabase (PostgreSQL)**  
   - Dans le projet Supabase : Settings → Database.  
   - Utilise la **Connection string** (mode « URI »), soit **Session mode** soit **Transaction mode** (pooler).  
   - Format type : `postgresql://postgres.[ref]:[MOT_DE_PASSE]@aws-1-eu-central-1.pooler.supabase.com:5432/postgres`  
   - Les migrations Prisma (`prisma migrate deploy`) fonctionnent telles quelles sur Supabase. Ne committe jamais ton fichier `.env` (il est dans `.gitignore`) ; sur Railway, renseigne `DATABASE_URL` dans les Variables du service.

5. **Migrations**  
   Le dossier `prisma/migrations/` est versionné avec une migration initiale. Au **démarrage** du service, Railway exécute `prisma migrate deploy` puis lance le serveur. Aucune action à faire si tu as bien `DATABASE_URL` dans les variables.

   **Si tu as l’erreur P3009 (failed migrations)** : une migration a échoué sur la base. Pour repartir de zéro sur Supabase :
   1. Ouvre le **SQL Editor** de ton projet Supabase.
   2. Exécute le script `server/api/prisma/supabase-reset-migrations.sql` (il supprime les tables et l’historique des migrations).
   3. Redéploie sur Railway : au démarrage, `prisma migrate deploy` réappliquera la migration.

6. **Récupérer l’URL du backend**  
   Dans Railway : service → Settings → Networking → Generate Domain.  
   Tu obtiens une URL du type `https://ton-api.up.railway.app`. **Conserve cette URL** pour le frontend.

---

## 2. Frontend sur Vercel

### Prérequis

- Compte [Vercel](https://vercel.com)
- Backend déjà déployé et URL connue

### Étapes

1. **Importer le projet**  
   [vercel.com/new](https://vercel.com/new) → Import Git Repository → sélectionne ton repo.

2. **Configurer le projet**  
   - **Root Directory** : `client/mobile` (cliquer sur Edit à côté du chemin).  
   - **Framework Preset** : Other (pas Next.js).  
   - **Build Command** : `npx expo export --platform web` (ou laisser vide si `vercel.json` le définit).  
   - **Output Directory** : `dist`.

3. **Variables d’environnement**  
   - `EXPO_PUBLIC_API_URL` : l’URL de ton API Railway (ex. `https://ton-api.up.railway.app`), **sans** slash final.

4. **Déployer**  
   Cliquer sur Deploy. Vercel build avec `expo export --platform web` et sert le contenu de `dist/`.

5. **Mettre à jour le backend (CORS)**  
   Dans Railway, la variable `FRONTEND_URL` doit être l’URL Vercel du frontend (ex. `https://elite-store.vercel.app`).  
   Si tu as déjà déployé le backend, modifie `FRONTEND_URL` et redéploie si besoin.

---

## 3. Récapitulatif des URLs

| Environnement | Variable | Exemple |
|---------------|----------|--------|
| Backend (Railway) | `FRONTEND_URL` | `https://elite-store.vercel.app` |
| Frontend (Vercel) | `EXPO_PUBLIC_API_URL` | `https://elite-store-api.up.railway.app` |

---

## 4. Commandes utiles

**Backend (local)**  
```bash
cd server/api
npm install
npx prisma migrate dev   # dev uniquement
npm run build            # prisma generate + migrate deploy
npm start
```

**Frontend web (local)**  
```bash
cd client/mobile
npm install
npm run build            # export web → dist/
# ou en dev :
npx expo start --web
```

**Créer un admin (local avec DATABASE_URL de prod possible)**  
```bash
cd server/api
ADMIN_EMAIL=admin@example.com ADMIN_PASSWORD=secret node scripts/create-admin.js
```

---

## 5. Dépannage

- **CORS** : Vérifier que `FRONTEND_URL` sur Railway correspond exactement à l’URL Vercel (sans slash final).
- **API injoignable depuis le front** : Vérifier `EXPO_PUBLIC_API_URL` sur Vercel et que le backend Railway a bien un domaine public.
- **Migrations** : Sur Railway, le build exécute `prisma migrate deploy`. En cas d’erreur, vérifier que `DATABASE_URL` est bien défini et que les migrations sont committées dans `server/api/prisma/migrations/`.
