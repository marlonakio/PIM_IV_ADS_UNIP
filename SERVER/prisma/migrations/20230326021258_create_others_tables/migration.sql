/*
  Warnings:

  - You are about to alter the column `cnpj` on the `empresas` table. The data in that column could be lost. The data in that column will be cast from `String` to `Decimal`.
  - You are about to alter the column `telefone` on the `empresas` table. The data in that column could be lost. The data in that column will be cast from `String` to `Decimal`.

*/
-- CreateTable
CREATE TABLE "funcionarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cpf" DECIMAL NOT NULL,
    "email" TEXT,
    "telefone" DECIMAL,
    "empresa_id" INTEGER NOT NULL,
    "cargo" TEXT NOT NULL,
    "hora_prevista" REAL NOT NULL,
    "salario" REAL NOT NULL,
    "valor_hora" REAL NOT NULL,
    CONSTRAINT "funcionarios_empresa_id_fkey" FOREIGN KEY ("empresa_id") REFERENCES "empresas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "pagamentos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "funcionario_id" INTEGER NOT NULL,
    "empresa_id" INTEGER NOT NULL,
    "hora_trabalhada" REAL NOT NULL,
    "salario_bruto" REAL NOT NULL,
    "valor_hora" REAL NOT NULL,
    "desc_inss" REAL NOT NULL,
    "desc_ir" REAL NOT NULL,
    "salario_liqui" REAL NOT NULL,
    "data" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "pagamentos_empresa_id_fkey" FOREIGN KEY ("empresa_id") REFERENCES "empresas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "pagamentos_funcionario_id_fkey" FOREIGN KEY ("funcionario_id") REFERENCES "funcionarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Historico" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "funcionario_id" INTEGER,
    "pagamento_id" TEXT,
    CONSTRAINT "Historico_funcionario_id_fkey" FOREIGN KEY ("funcionario_id") REFERENCES "funcionarios" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Historico_pagamento_id_fkey" FOREIGN KEY ("pagamento_id") REFERENCES "pagamentos" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_empresas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cnpj" DECIMAL NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" DECIMAL NOT NULL
);
INSERT INTO "new_empresas" ("cnpj", "email", "id", "nome", "telefone") SELECT "cnpj", "email", "id", "nome", "telefone" FROM "empresas";
DROP TABLE "empresas";
ALTER TABLE "new_empresas" RENAME TO "empresas";
CREATE UNIQUE INDEX "empresas_cnpj_key" ON "empresas"("cnpj");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "funcionarios_cpf_key" ON "funcionarios"("cpf");
