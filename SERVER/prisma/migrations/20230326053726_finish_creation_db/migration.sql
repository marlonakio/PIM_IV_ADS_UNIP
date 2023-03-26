/*
  Warnings:

  - Added the required column `empresaId` to the `pagamentos` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_pagamentos" (
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
    "empresaId" INTEGER NOT NULL,
    CONSTRAINT "pagamentos_empresa_id_fkey" FOREIGN KEY ("empresa_id") REFERENCES "empresas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "pagamentos_funcionario_id_fkey" FOREIGN KEY ("funcionario_id") REFERENCES "funcionarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_pagamentos" ("data", "desc_inss", "desc_ir", "empresa_id", "funcionario_id", "hora_trabalhada", "id", "salario_bruto", "salario_liqui", "valor_hora") SELECT "data", "desc_inss", "desc_ir", "empresa_id", "funcionario_id", "hora_trabalhada", "id", "salario_bruto", "salario_liqui", "valor_hora" FROM "pagamentos";
DROP TABLE "pagamentos";
ALTER TABLE "new_pagamentos" RENAME TO "pagamentos";
CREATE UNIQUE INDEX "pagamentos_funcionario_id_data_key" ON "pagamentos"("funcionario_id", "data");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
