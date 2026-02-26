-- À exécuter dans Supabase : SQL Editor
-- Réinitialise l’état des migrations Prisma pour repartir de zéro.
-- À utiliser uniquement si une migration a échoué (P3009) et que la base peut être remise à zéro.

-- 1. Supprimer les tables de l’app (ordre à respecter à cause des FK)
DROP TABLE IF EXISTS "SellerProfile";
DROP TABLE IF EXISTS "User";

-- 2. Supprimer l’enum
DROP TYPE IF EXISTS "Role";

-- 3. Supprimer l’historique des migrations Prisma (Prisma recréera la table au prochain migrate deploy)
DROP TABLE IF EXISTS "_prisma_migrations";

-- Ensuite : redéploie sur Railway (ou en local : npx prisma migrate deploy).
