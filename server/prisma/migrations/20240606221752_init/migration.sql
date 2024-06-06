/*
  Warnings:

  - You are about to drop the column `CreationDate` on the `Schule` table. All the data in the column will be lost.
  - You are about to drop the column `EditDate` on the `Schule` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Schule" DROP COLUMN "CreationDate",
DROP COLUMN "EditDate";
