-- En SQL on peut également modifier la structure d'une table existante
-- Si un projet est déjà en prod, on évite de tous réinitialiser, perdre toutes les données, etc...

ALTER TABLE "user" ADD COLUMN "role" TEXT NOT NULL DEFAULT 'member';


