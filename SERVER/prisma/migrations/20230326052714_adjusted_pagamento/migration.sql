/*
  Warnings:

  - You are about to drop the `Historico` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[funcionario_id,data]` on the table `pagamentos` will be added. If there are existing duplicate values, this will fail.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Historico";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "historico" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "funcionario_id" INTEGER,
    "pagamento_id" TEXT,
    CONSTRAINT "historico_funcionario_id_fkey" FOREIGN KEY ("funcionario_id") REFERENCES "funcionarios" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "historico_pagamento_id_fkey" FOREIGN KEY ("pagamento_id") REFERENCES "pagamentos" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "pagamentos_funcionario_id_data_key" ON "pagamentos"("funcionario_id", "data");
