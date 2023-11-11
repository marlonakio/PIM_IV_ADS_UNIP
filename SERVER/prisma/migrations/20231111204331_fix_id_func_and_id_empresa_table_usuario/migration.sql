/*
  Warnings:

  - You are about to drop the column `id_user` on the `usuarios` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_usuarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "rh" BOOLEAN NOT NULL,
    "id_func" INTEGER,
    "id_empresa" INTEGER
);
INSERT INTO "new_usuarios" ("email", "id", "nome", "rh", "senha") SELECT "email", "id", "nome", "rh", "senha" FROM "usuarios";
DROP TABLE "usuarios";
ALTER TABLE "new_usuarios" RENAME TO "usuarios";
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
